export class Resort{
  constructor(data){
    this.id = data.id
    this.snoId = data.snoId
    this.resortName = data.resortName
    this.state = data.state
    this.country = data.country
    this.resortStatus = data.resortStatus
    this.openDownHillTrails = data.openDownHillTrails
    this.openDownHillLifts = data.openDownHillLifts
    this.maxOpenDownHillTrails = data.maxOpenDownHillTrails
    this.maxOpenDownHillLifts = data.maxOpenDownHillLifts
    this.snowComments = data.snowComments
    this.nightSkiing = data.nightSkiing == "yes"
    this.operatingStatus = data.operatingStatus
    this.primarySurfaceCondition = data.primarySurfaceCondition
    this.resortType = data.resortType
    this.resortImg = data.resortImg
    this.trailImg = data.trailImg
    this.address = data.address
  }
}