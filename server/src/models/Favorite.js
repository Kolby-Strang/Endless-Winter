import { Schema } from "mongoose";

export const FavoriteSchema = new Schema({
    accountId: { type: Schema.Types.ObjectId, required: true },
    resortId: { type: Schema.Types.ObjectId, required: true }
}, {
    timestamps: true,
    toJSON: { virtuals: true }
})