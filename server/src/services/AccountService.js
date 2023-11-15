import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors.js'

// Private Methods

/**
 * Creates account if one does not exist
 * @param {any} account
 * @param {any} user
 */
async function createAccountIfNeeded(account, user) {
  if (!account) {
    user._id = user.id
    if (typeof user.name == 'string' && user.name.includes('@')) {
      user.name = user.nickname
    }
    account = await dbContext.Account.create({
      ...user,
      subs: [user.sub]
    })
  }
  return account
}

/**
 * Adds sub to account if not already on account
 * @param {any} account
 * @param {any} user
 */
async function mergeSubsIfNeeded(account, user) {
  if (!account.subs.includes(user.sub)) {
    // @ts-ignore
    account.subs.push(user.sub)
    await account.save()
  }
}
/**
 * Restricts changes to the body of the account object
 * @param {any} body
 */
function sanitizeBody(body) {
  const writable = {
    name: body.name,
    picture: body.picture,
    skier: body.skier,
    snowBoarder: body.snowBoarder,
    pinnedFavorite: body.pinnedFavorite,
    bio: body.bio
  }
  return writable
}

class AccountService {
  /**
   * Returns a user account from the Auth0 user object
   *
   * Creates user if none exists
   *
   * Adds sub of Auth0 account to account if not currently on account
   * @param {any} user
   */
  async getAccount(user) {
    let account = await dbContext.Account.findOne({
      _id: user.id
    })
    account = await createAccountIfNeeded(account, user)
    await mergeSubsIfNeeded(account, user)
    return account
  }

  async getAccountById(accountId) {
    const account = await dbContext.Account.findById(accountId)
    if (!account) {
      throw new BadRequest(`There are no accounts with Id: ${accountId}`)
    }
    await account.populate('favorites')
    // TODO TEST THIS
    // @ts-ignore
    const pinnedFavoriteIndex = account.favorites.findIndex(favorite => favorite.snoId == account.pinnedFavorite)
    if (pinnedFavoriteIndex != -1) {
      // @ts-ignore
      const pinnedFavorite = account.favorites[pinnedFavoriteIndex]
      // @ts-ignore
      account.favorites.splice(pinnedFavoriteIndex, 1)
      // @ts-ignore
      account.favorites.unshift(pinnedFavorite)
    }
    return account
  }

  /**
   * Updates account with the request body, will only allow changes to editable fields
   *  @param {any} user Auth0 user object
   *  @param {any} body Updates to apply to user object
   */
  async updateAccount(user, body) {
    const update = sanitizeBody(body)
    const account = await dbContext.Account.findOneAndUpdate(
      { _id: user.id },
      { $set: update },
      { runValidators: true, setDefaultsOnInsert: true, new: true }
    )
    return account
  }
}
export const accountService = new AccountService()
