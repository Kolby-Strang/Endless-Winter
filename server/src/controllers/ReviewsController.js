import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { reviewsService } from "../services/ReviewsService.js";
import { likesService } from "../services/LikesService.js";

export class ReviewsController extends BaseController {
    constructor() {
        super('api/reviews')
        this.router
            .get('/:reviewId/likes', this.getLikesByReviewId)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createReview)
            .put('/:reviewId', this.updateReview)
    }

    async getLikesByReviewId(req, res, next) {
        try {
            const reviewId = req.params.reviewId
            const likes = await likesService.getLikesByThingId(reviewId)
            return res.send(likes)
        } catch (error) {
            next(error)
        }

    }

    async updateReview(req, res, next) {
        try {
            const userId = req.userInfo.id
            const reviewData = req.body
            const reviewId = req.params.reviewId
            reviewData.id = reviewId
            const review = await reviewsService.updateReview(reviewData, userId)
            res.send(review)
        } catch (error) {
            next(error)
        }
    }
    async createReview(req, res, next) {
        try {
            const userId = req.userInfo.id
            const reviewData = req.body
            reviewData.accountId = userId
            const review = await reviewsService.createReview(reviewData)
            res.send(review)
        } catch (error) {
            next(error)
        }
    }
}