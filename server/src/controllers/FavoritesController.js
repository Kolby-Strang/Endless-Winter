import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { favoritesService } from "../services/FavoritesService.js";

export class FavoritesController extends BaseController {
    constructor() {
        super('api/favorites')
        this.router

            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createFavorite)
            .delete('/:favoriteId', this.destroyFavorite)

    }
    async destroyFavorite(req, res, next) {
        try {
            const userId = req.userInfo.id
            const favoriteId = req.params.favoriteId
            const message = await favoritesService.destroyFavorite(favoriteId, userId)
            res.send(message)
        } catch (error) {
            next(error)
        }
    }

    async createFavorite(req, res, next) {
        try {
            const userId = req.userInfo.id
            const favoriteData = req.body
            favoriteData.accountId = userId
            const favorite = await favoritesService.createFavorite(favoriteData)
            res.send(favorite)

        } catch (error) {
            next(error)
        }

    }

}
