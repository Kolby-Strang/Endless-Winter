import { Auth0Provider } from "@bcwdev/auth0provider";
import { resortsService } from "../services/ResortsService.js";
import BaseController from "../utils/BaseController.js";
import { reviewsService } from "../services/ReviewsService.js";
import { postsService } from "../services/PostsService.js";

export class ResortsController extends BaseController {
    constructor() {
        super('api/resorts')
        this.router
            .get('/:snoId', this.getResortById)
            .get('/:snoId/posts', this.getPostsByResortId)
            .get('/:snoId/reviews', this.getReviewsByResortId)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createResort)
            .put('/:snoId', this.updateResort)
    }
    async getPostsByResortId(req, res, next) {
        try {
            const snoId = req.params.snoId
            const posts = await postsService.getPostsByResortId(snoId)
            res.send(posts)
        } catch (error) {
            next(error)
        }
    }
    async getReviewsByResortId(req, res, next) {
        try {
            const snoId = req.params.snoId
            const reviews = await reviewsService.getReviewsByResortId(snoId)
            res.send(reviews)
        } catch (error) {
            next(error)
        }
    }
    async updateResort(req, res, next) {
        try {
            const userId = req.userInfo.id
            const updateBody = req.body
            const targetSnoId = req.params.snoId
            updateBody.snoId = targetSnoId
            const updatedResort = await resortsService.updateResort(userId, updateBody)
            res.send(updatedResort)
        } catch (error) {
            next(error)
        }
    }
    async createResort(req, res, next) {
        try {
            const userId = req.userInfo.id
            const resortData = req.body
            const resort = await resortsService.createResort(resortData, userId)
            res.send(resort)
        } catch (error) {
            next(error)
        }
    }
    async getResortById(req, res, next) {
        try {
            const snoId = req.params.snoId
            const resort = await resortsService.getResortById(snoId)
            return res.send(resort)
        } catch (error) {
            next(error)
        }
    }
}