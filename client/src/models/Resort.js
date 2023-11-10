export class Resort {
  constructor(data) {
    this.id = data.id
    this.snoId = data.snoId
    this.resortName = data.resortName
    this.state = data.state
    this.country = data.country
    this.resortStatus = data.resortStatus
    this.openDownHillTrails = data.openDownHillTrails == "" ? 0 : data.openDownHillTrails
    this.openDownHillLifts = data.openDownHillLifts == "" ? 0 : data.openDownHillLifts
    this.maxOpenDownHillTrails = data.maxOpenDownHillTrails
    this.maxOpenDownHillLifts = data.maxOpenDownHillLifts
    this.openDownHillLiftsPercentage = this.liftsPercentage
    this.openDownHillTrailsPercentage = this.trailsPercentage
    this.snowComments = data.snowComments
    this.nightSkiing = data.nightSkiing == "yes"
    this.operatingStatus = data.operatingStatus
    this.primarySurfaceCondition = data.primarySurfaceCondition
    this.resortType = data.resortType
    this.resortImg = data.resortImg
    this.trailImg = data.trailImg
    this.address = data.address
  }

  get liftsPercentage() {
    let percentage = this.openDownHillLifts / this.maxOpenDownHillLifts
    percentage *= 100
    percentage.toFixed(0)
    return percentage
  }
  get trailsPercentage() {
    let percentage = this.openDownHillTrails / this.maxOpenDownHillTrails
    percentage *= 100
    percentage.toFixed(0)
    return percentage
  }
}