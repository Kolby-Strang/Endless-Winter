import { dbContext } from "../db/DbContext.js"
import { NotFound, UnAuthorized } from "../utils/Errors.js"

class ResortsService {
    async updateResort(userId, updateBody) {
        const userInfo = await dbContext.Account.findById(userId)
        const userIsAdminOfResortId = userInfo.resortAdmin
        const resort = await this.getResortById(updateBody.snoId)
        if (!resort.snoId) {
            throw new NotFound(`Resort with id:${updateBody.snoId} not available, contact admins`)
        }
        if (userIsAdminOfResortId != resort.snoId) {
            throw new UnAuthorized(`You do not have permission to edit resort ${resort.snoId}`)
        }
        resort.trailImg = updateBody.trailImg || resort.trailImg
        resort.resortImg = updateBody.resortImg || resort.resortImg
        resort.address = updateBody.address || resort.address
        resort.save()
        return resort
    }
    async createResort(resortData, userId) {
        if (userId.toString() != '65330f5800fc89b954fa12ed' || userId.toString() != '654d097a65a6c62eb78efa9e' || userId.toString() != '654d19de2e715a5aa6409d05') {
            throw new UnAuthorized('You are not a Endless Winter Admin')
        }
        const resort = await dbContext.Resort.create(resortData)
        return resort
    }
    async getResortById(snoId) {
        const resort = await dbContext.Resort.findOne({ snoId })
        if (resort) {
            return resort
        }
        return {}
    }
}


export const resortsService = new ResortsService()