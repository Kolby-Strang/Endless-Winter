import { AppState } from "../AppState.js"
import { Resort } from "../models/Resort.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class ResortsService{
  async getResortbyId(resortId){
    const res = await api.get(`http://feeds.snocountry.net/getSnowReport.php?apiKey=SnoCountry.example&ids=${resortId}`)
    const resort = new Resort(res.data.items[0])
    const res2 = await api.get(`api/resorts/${resortId}`)
    resort.address = res2.data.address
    resort.resortImg = res2.data.resortImg
    resort.trailImg = res2.data.trailImg
    AppState.resorts = resort
  }
}

export const resortsService = new ResortsService()