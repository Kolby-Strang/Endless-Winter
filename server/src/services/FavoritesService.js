import { dbContext } from "../db/DbContext.js"
import { BadRequest, UnAuthorized } from "../utils/Errors.js"

class FavoritesService {
    async destroyFavorite(favoriteId, userId) {
        const favorite = await dbContext.Favorite.findById(favoriteId)
        if (!favorite) {
            throw new BadRequest(`Favorite with Id: ${favoriteId} does not exist`)
        }
        if (favorite.accountId != userId) {
            throw new UnAuthorized('You do not have permission to delete that favorite')
        }
        await favorite.delete()
        return 'Favorite Deleted'
    }
    async createFavorite(favoriteData) {
        const existingFavorite = await dbContext.Favorite.findOne({ snoId: favoriteData.snoId, accountId: favoriteData.accountId })
        if (existingFavorite) {
            const message = await this.destroyFavorite(existingFavorite.id, existingFavorite.accountId.toString())
            return message
        }
        const favorite = await dbContext.Favorite.create(favoriteData)
        return favorite
    }
    async getFavoritesByAccountId(accountId) {

        const favorites = await dbContext.Favorite.find({ accountId })
        return favorites
    }
}

export const favoritesService = new FavoritesService()