import { AppState } from "../AppState.js"
import { Comment } from "../models/Comment.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class PostsService {

    async getCommentsByPostsId(postId) {

        const res = await api.get(`api/posts/${postId}/comments`)
        logger.log(res.data)
        const commentData = res.data.map(comment => new Comment(comment))
        AppState.comments = commentData
    }

}

export const postsService = new PostsService()