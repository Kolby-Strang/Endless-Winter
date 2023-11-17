import { Schema } from "mongoose";

export const FavoriteSchema = new Schema({
    accountId: { type: Schema.Types.ObjectId, required: true },
    snoId: { type: Number, required: true }
}, {
    timestamps: true,
    toJSON: { virtuals: true }
})


FavoriteSchema.index({ accountId: 1, snoId: 1 }, { unique: true })