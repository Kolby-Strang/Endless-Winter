import { Schema } from "mongoose";

export const LikeSchema = new Schema({
    accountId: { type: Schema.Types.ObjectId, required: true },
    thingId: { type: Schema.Types.ObjectId, required: true },

}, {
    timestamps: true,
    toJSON: { virtuals: true }
})

LikeSchema.index({ accountId: 1, thingId: 1 }, { unique: true })


