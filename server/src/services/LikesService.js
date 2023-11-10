import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class LikesService {
    async createLikes(likeData) {
        const existingLike = await dbContext.Like.findOne({ thingId: likeData.thingId, accountId: likeData.accountId })
        if (existingLike) {
            const message = await this.destroyLike(existingLike.id, existingLike.accountId.toString())
            return message
        }
        const like = await dbContext.Like.create(likeData)
        return like
    }

    async destroyLike(likeId, userId) {

        const like = await dbContext.Like.findById(likeId)
        if (!like) {
            throw new BadRequest(`like with Id: ${likeId} is invalid`)
        }
        if (like.accountId != userId) {
            throw new Forbidden(`Like with id: ${likeId} is not yours to delete`)
        }
        await like.delete()

        return 'like deleted'

    }

    async getLikesByThingId(thingId) {
        const likes = await dbContext.Like.find({ thingId })
        return likes
    }

}
export const likesService = new LikesService()