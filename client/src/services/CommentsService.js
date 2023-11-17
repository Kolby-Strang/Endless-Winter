import { Modal } from "bootstrap"
import { AppState } from "../AppState.js"
import { Comment } from "../models/Comment.js"
import { api } from "./AxiosService.js"

class CommentService {

    async createComment() {
        const res = await api.post(`api/comments`)
        const newComment = new Comment(res.data)
        AppState.comments.unshift(newComment)

    }
    destroyComment(commentId) {
        const res = api.delete(`api/comments/${commentId}`)
        return res.data
    }
    async editComment(commentData) {
        const commentId = AppState.commentToBeEdited
        const res = await api.put(`api/comments/${commentId}`, commentData)
        const foundIndex = AppState.comments.findIndex(comment => comment.id == commentId)
        const newComment = new Comment(res.data)
        AppState.comments.splice(foundIndex, 1, newComment)
        Modal.getOrCreateInstance('#editCommentModal').hide()
    }
    setComment(commentId) {
        AppState.commentToBeEdited = commentId
    }

}


export const commentsService = new CommentService()