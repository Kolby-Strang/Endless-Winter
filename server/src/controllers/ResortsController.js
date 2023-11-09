import { Auth0Provider } from "@bcwdev/auth0provider";
import { resortsService } from "../services/ResortsService.js";
import BaseController from "../utils/BaseController.js";

export class ResortsController extends BaseController {
    constructor() {
        super('api/resorts')
        this.router
            .get('/:snoId', this.getResortById)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createResort)
            .put('/:snoId', this.updateResort)
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