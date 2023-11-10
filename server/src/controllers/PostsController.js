import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { postsService } from "../services/PostsService.js";

export class PostsController extends BaseController {
  constructor() {
    super('api/posts')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createPost)
      .put('/:postId', this.editPost)
      .delete('/:postId', this.destroyPost)
  }
  async destroyPost(req, res, next) {
    try {
      const postId = req.params.postId
      const userId = req.userInfo.id
      const message = await postsService.destroyPost(postId, userId)
      res.send(message)
    } catch (error) {
      next(error)
    }
  }
  async editPost(req, res, next) {
    try {
      const postId = req.params.postId
      const postData = req.body
      const userId = req.userInfo.id
      const post = await postsService.editPost(postData, postId, userId)
      res.send(post)
    } catch (error) {
      next(error)
    }
  }
  async createPost(req, res, next) {
    try {
      const postData = req.body
      const userId = req.userInfo.id
      postData.accountId = userId
      const post = await postsService.createPost(postData)
      res.send(post)
    } catch (error) {
      next(error)
    }
  }
}