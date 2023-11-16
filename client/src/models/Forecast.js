export class Forecast{
    constructor(data){
        this.date = new Date(data.dateTimeISO)
        this.maxTempF = data.maxTempF
        this.minTempF = data.minTempF
        this.icon = data.icon
        this.weather = data.weather
    }
}