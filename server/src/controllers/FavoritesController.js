import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { favoritesService } from "../services/FavoritesService.js";

export class FavoritesController extends BaseController {
    constructor() {
        super('api/favorites')
        this.router

            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createFavorite)
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
