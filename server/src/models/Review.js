import { Schema } from "mongoose";

export const ReviewSchema = new Schema({
    accountId: { type: Schema.Types.ObjectId, required: true },
    snoId: { type: Number, required: true },
    body: { type: String, required: true, maxLength: 5000 },
    title: { type: String, required: true, maxLength: 100 },
    starCount: { type: Number, required: true, min: 0, max: 5 }
}, {
    timestamps: true,
    toJSON: { virtuals: true }
})

ReviewSchema.index({ accountId: 1, snoId: 1 }, { unique: true })


ReviewSchema.virtual('account', {
    localField: "accountId",
    foreignField: "_id",
    ref: "Account",
    justOne: true
})

ReviewSchema.virtual('likes', {
    localField: '_id',
    foreignField: 'thingId',
    ref: 'Like'
})
