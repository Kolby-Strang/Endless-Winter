import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
import BaseController from '../utils/BaseController'
import { favoritesService } from '../services/FavoritesService.js'
import { postsService } from "../services/PostsService.js"

export class AccountController extends BaseController {
  constructor() {
    super('account')
    this.router
      .get('/:accountId/favorites', this.getFavoritesByAccountId)
      .get('/:accountId/posts', this.getPostsByAccountId)
      .get('/:accountId', this.getAccountById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getUserAccount)
  }
  async getAccountById(req, res, next) {
    try {
      const account = await accountService.getAccount({ id: req.params.accountId })
      return res.send(account)
    } catch (error) {
      next(error)
    }
  }
  async getPostsByAccountId(req, res, next) {
    try {
      const accountId = req.params.accountId
      const posts = await postsService.getPostsByAccountId(accountId)
      res.send(posts)
    } catch (error) {
      next(error)
    }
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
