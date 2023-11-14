import { AppState } from "../AppState.js"
import { Resort } from "../models/Resort.js"
import { api, resortsApi } from "./AxiosService.js"
import { logger } from "../utils/Logger.js"

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
    const res = await api.get(`api/resorts/${resortId}/posts`)
    logger.log(res)
  }


}

export const resortsService = new ResortsService()