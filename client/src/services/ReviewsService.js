import { AppState } from "../AppState"
import { Review } from "../models/Review"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"
class ReviewsService {

  async createReview(reviewData) {
    const res = await api.post('api/reviews', reviewData)
    logger.log(res)
    AppState.resortReviews.push(new Review(res.data))
  }
}

export const reviewsService = new ReviewsService()