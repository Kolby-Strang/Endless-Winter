import { Schema } from "mongoose";

export const CommentSchema = new Schema({
    thingId: { type: Schema.Types.ObjectId, required: true },
    accountId: { type: Schema.Types.ObjectId, required: true },
    body: { type: String, required: true, maxLength: 500 }
}, {
    timestamps: true,
    toJSON: { virtuals: true }
})