import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden, UnAuthorized } from "../utils/Errors.js"

class PostsService {
  async destroyPost(postId, userId) {
    const post = await dbContext.Post.findById(postId)
    if (!post) {
      throw new BadRequest(`Post with Id: ${postId} does not exist`)
    }
    if (post.accountId.toString() != userId) {
      throw new Forbidden(`Post with Id: ${postId} is not yours to delete`)
    }
    post.delete()
    return `Post deleted`
  }
  async editPost(postData, postId, userId) {
    const post = await dbContext.Post.findById(postId)
    if (!post) {
      throw new BadRequest(`Post with Id: ${postId} does not exist`)
    }
    if (post.accountId != userId) {
      throw new UnAuthorized(`You are not allowed to edit post with Id: ${postId}`)
    }
    post.body = postData.body || post.body
    post.title = postData.title || post.title
    post.imgUrl = postData.imgUrl || post.imgUrl
    await post.save()
    return post
  }
  async getPostsByAccountId(accountId) {
    const account = await dbContext.Account.findById(accountId)
    if (!account) {
      throw new BadRequest(`Account with Id: ${accountId} does not exist`)
    }
    const posts = await dbContext.Post.find({ accountId })
    return posts
  }
  async getPostsByResortId(snoId) {
    const posts = await dbContext.Post.find({ snoId }).populate('account', 'name picture id').populate('likes')

    posts.forEach(post => post.likes = post.likes.map(like => like.accountId))
    return posts
  }
  async createPost(postData) {
    const post = await dbContext.Post.create(postData)
    post.likes = []
    return post
  }
}


export const postsService = new PostsService()