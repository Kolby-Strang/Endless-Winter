import { dbContext } from "../db/DbContext.js"

class FavoritesService {
    async createFavorite(favoriteData) {
        const favorite = await dbContext.Favorite.create(favoriteData)
        return favorite

    }
    async getFavoritesByAccountId(accountId) {

        const favorites = await dbContext.Favorite.find({ accountId })
        return favorites
    }
}

export const favoritesService = new FavoritesService()