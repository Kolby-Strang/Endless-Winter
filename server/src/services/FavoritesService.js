import { dbContext } from "../db/DbContext.js"

class FavoritesService {
    async getFavoritesByAccountId(accountId) {

        const favorites = await dbContext.Favorite.find({ accountId })
        return favorites
    }
}

export const favoritesService = new FavoritesService()