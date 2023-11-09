import { Schema } from "mongoose";

export const FavoriteSchema = new Schema({
    accountId: { type: Schema.Types.ObjectId, required: true },
    snoId: { type: Number, required: true }
}, {
    timestamps: true,
    toJSON: { virtuals: true }
})