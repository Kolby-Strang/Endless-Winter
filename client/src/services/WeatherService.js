import { logger } from "../utils/Logger"
import { weatherApi } from "./AxiosService"

class WeatherService{
    async getCurrentWeatherByGeoLocation(lat, lon){
        const res = await weatherApi.get(`conditions/${lat},${lon}`)
        const weather = res.data.response[0].periods[0]
        return weather
    }
    async getForecastByGeoLocation(lat, lon){
        const res = await weatherApi.get(`forecasts/${lat},${lon}?filter=day&limit=7`)
        const forecast = res.data.response[0].periods
        return forecast
    }
}


export const weatherService = new WeatherService()