import { dbContext } from "../db/DbContext.js"

class ReviewsService {
    async getReviewsByResortId(snoId) {
        const reviews = await dbContext.Review.find({ snoId })
        return reviews
    }
    async createReview(reviewData) {
        const review = await dbContext.Review.create(reviewData)
        return review
    }
}


export const reviewsService = new ReviewsService()