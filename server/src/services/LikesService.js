import { dbContext } from "../db/DbContext.js"

class LikesService {
    async createLikes(likeData) {
        const like = await dbContext.Like.create(likeData)

        return like
    }


}
export const likesService = new LikesService()