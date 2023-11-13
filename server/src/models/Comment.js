import { Schema } from "mongoose";

export const CommentSchema = new Schema({
    thingId: { type: Schema.Types.ObjectId, required: true },
    accountId: { type: Schema.Types.ObjectId, required: true },
    body: { type: String, required: true, maxLength: 500 }
}, {
    timestamps: true,
    toJSON: { virtuals: true }
})

CommentSchema.virtual('account', {
    localField: "accountId",
    foreignField: "_id",
    ref: "Account",
    justOne: true
})

CommentSchema.virtual('likes', {
    localField: '_id',
    foreignField: 'thingId',
    ref: 'Like'
})