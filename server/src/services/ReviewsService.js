import { dbContext } from "../db/DbContext.js"
import { BadRequest, UnAuthorized } from "../utils/Errors.js"

class ReviewsService {
    async updateReview(reviewData, userId) {
        const review = await dbContext.Review.findById(reviewData.id)
        if (!review) {
            throw new BadRequest(`Review with id: ${reviewData.id} does not exist`)
        }
        if (review.accountId != userId) {
            throw new UnAuthorized(`You do not have permission to edit review ${review.id}`)
        }
        review.starCount = reviewData.starCount || review.starCount
        review.body = reviewData.body || review.body
        review.title = reviewData.title || review.title
        await review.save()
        return review
    }
    async getReviewsByResortId(snoId) {
        const reviews = await dbContext.Review.find({ snoId }).populate('account', 'name id picture').populate('likes')
        // @ts-ignore
        reviews.forEach(review => review.likes = review.likes.map(like => like.accountId))
        return reviews
    }
    async createReview(reviewData) {
        const review = await dbContext.Review.create(reviewData)
        return review
    }
}


export const reviewsService = new ReviewsService()