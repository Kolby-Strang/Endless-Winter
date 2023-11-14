export class Comment {
    constructor(data) {
        this.id = data.id
        this.body = data.body
        this.account = data.account
        this.likes = data.likes
        this.thingId = data.thingId
    }

}