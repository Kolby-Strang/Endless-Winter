import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { favoritesService } from "../services/FavoritesService.js";

export class FavoritesController extends BaseController {
    constructor() {
        super('api/favorites')
        this.router

            .use(Auth0Provider.getAuthorizedUserInfo)

    }



}
