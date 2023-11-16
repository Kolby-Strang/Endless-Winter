export class Weather {
    constructor(data) {
        this.icon = data.icon
        this.tempF = data.tempF
        this.windSpeedMPH = data.windSpeedMPH
        this.weather = data.weather
        this.date = new Date(data.dateTimeISO)
    }
}