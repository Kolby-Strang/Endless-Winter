import { likesService } from "../services/LikesService.js";
import BaseController from "../utils/BaseController.js";

export class LikesController extends BaseController {
    constructor() {
        super(`api/likes`)
        this.router
            .post('', this.createLike)
    }

    async createLike(req, res, next) {
        try {
            const likeData = req.body
            const userId = req.userInfo.id
            likeData.accountId = userId
            const likes = await likesService.createLikes(likeData)
            res.send(likes)

        } catch (error) {
            next(error)
        }
    }
}