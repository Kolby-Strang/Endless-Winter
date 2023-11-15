import { AppState } from "../AppState.js"
import { Resort } from "../models/Resort.js"
import { api, resortsApi } from "./AxiosService.js"
import { logger } from "../utils/Logger.js"
import { Post } from "../models/Post.js"
import { Review } from "../models/Review.js"
class ResortsService {
  async getResortById(resortId) {
    const res = await resortsApi.get(`/getSnowReport.php`, { params: { ids: resortId } })
    const resort = new Resort(res.data.items[0])
    const res2 = await api.get(`api/resorts/${resortId}`)
    resort.address = res2.data.address
    resort.resortImg = res2.data.resortImg
    resort.trailImg = res2.data.trailImg
    AppState.activeResort = resort
    return resort
  }

  async getPostsByResortId(resortId) {
    AppState.resortPosts = []
    const res = await api.get(`api/resorts/${resortId}/posts`)
    const posts = res.data.map(post => new Post(post))
    AppState.resortPosts = posts
  }


  async getReviewsByResortId(resortId) {
    AppState.resortReviews = []
    const res = await api.get(`api/resorts/${resortId}/reviews`)
    const reviews = res.data.map(review => new Review(review))
    AppState.resortReviews = reviews
  }

  async getFavoriteResorts(favorites) {
    AppState.activeFavoritesResorts = []
    logger.log(favorites)
    for (let i = 0; i < favorites?.length; i++) {
      // logger.log(favorites[i])
      const res = await resortsApi.get(`/getSnowReport.php`, { params: { ids: favorites[i].snoId } })
      // logger.log(res.data)
      AppState.activeFavoritesResorts.push(new Resort(res.data.items[0]))
    }
  }

}

export const resortsService = new ResortsService()