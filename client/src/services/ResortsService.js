import { AppState } from "../AppState.js"
import { Resort } from "../models/Resort.js"
import { api, resortsApi } from "./AxiosService.js"

class ResortsService {
  async getResortbyId(resortId) {
    const res = await resortsApi.get(`/getSnowReport.php`, { params: { ids: resortId } })
    const resort = new Resort(res.data.items[0])
    const res2 = await api.get(`api/resorts/${resortId}`)
    resort.address = res2.data.address
    resort.resortImg = res2.data.resortImg
    resort.trailImg = res2.data.trailImg
    AppState.pinedResort = resort
  }
}

export const resortsService = new ResortsService()