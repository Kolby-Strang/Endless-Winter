export class Account {
  constructor(data) {
    this.id = data.id
    this.email = data.email
    this.name = data.name
    this.picture = data.picture
    this.isOwner = data.isOwner
    this.skier = data.skier
    this.snowBoarder = data.snowBoarder
    this.favorites = data.favorites
  }
}
