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
    resort.trailImgs = res2.data.trailImgs
    resort.lat = res2.data.lat
    resort.lon = res2.data.lon
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
      AppState.activeFavoritesResorts.push(await this.getResortById(favorites[i].snoId))
    }
  }

}

export const resortsService = new ResortsService()