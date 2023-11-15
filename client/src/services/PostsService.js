import { Modal } from "bootstrap"
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

    async getPostByPostId(postId) {
        const res = await api.get(`api/posts/${postId}`)
        logger.log(res.data)
        const postData = new Post(res.data)
        AppState.activePost = postData

    }

    async createPost(postData) {
        const res = await api.post('api/posts', postData)
        const newPost = new Post(res.data)
        AppState.resortPosts.push(newPost)
    }

    async editPost(postData) {
        const res = await api.put(`api/posts/${postData.id}`, postData)
        logger.log(res.data)
        const editedPost = new Post(res.data)
        Modal.getOrCreateInstance('#editPostModal').hide()
        AppState.activePost = editedPost
    }
}

export const postsService = new PostsService()