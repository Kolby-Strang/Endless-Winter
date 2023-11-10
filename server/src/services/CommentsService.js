import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class CommentsService {
    async editComment(commentData, commentId, userId) {
        const comment = await this.getCommentById(commentId)
        if (comment.accountId.toString() != userId) {
            throw new Forbidden(`Comment with ID: ${commentId} is not yours to edit`)
        }
        comment.body = commentData.body || comment.body
        await comment.save()
        return comment
    }
    async getCommentById(commentId) {
        const comment = await dbContext.Comment.findById(commentId)
        if (!comment) {
            throw new BadRequest(`Comment with id: ${commentId} does not exist`)
        }
        return comment
    }
    async destroyComment(commentId, userId) {
        const comment = await this.getCommentById(commentId)
        if (comment.accountId.toString() != userId) {
            throw new Forbidden(`Comment with ID: ${commentId} is not yours to delete`)
        }
        await comment.delete()
        return 'Comment Deleted'
    }
    async getCommentsByThingId(thingId) {
        const comments = await dbContext.Comment.find({ thingId })
        return comments
    }
    async createComment(commentData) {
        const comment = await dbContext.Comment.create(commentData)
        return comment
    }

}


export const commentsService = new CommentsService()