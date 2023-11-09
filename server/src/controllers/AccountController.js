import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
import BaseController from '../utils/BaseController'
import { favoritesService } from '../services/FavoritesService.js'

export class AccountController extends BaseController {
  constructor() {
    super('account')
    this.router
      .get(`/:accountId/favorites`, this.getFavoritesByAccountId)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getUserAccount)
  }

  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }

  async getFavoritesByAccountId(req, res, next) {
    try {
      const accountId = req.params.accountId
      const favorites = await favoritesService.getFavoritesByAccountId(accountId)
      res.send(favorites)
    } catch (error) {
      next(error)
    }

  }
}
