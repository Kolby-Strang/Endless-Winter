import { AppState } from "../AppState.js"
import { Comment } from "../models/Comment.js"
import { Post } from "../models/Post.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class PostsService {

    async getCommentsByPostsId(postId) {

        const res = await api.get(`api/posts/${postId}/comments`)
        logger.log(res.data)
        const commentData = res.data.map(comment => new Comment(comment))
        AppState.comments = commentData
    }

    async getPostsByPostsId(postId) {
        const res = await api.get(`api/posts/${postId}`)
        const postData = res.data.map(post => new Post(post))
        AppState.activePost = postData

    }
}

export const postsService = new PostsService()