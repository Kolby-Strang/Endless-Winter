import { Schema } from "mongoose";

export const PostSchema = new Schema({
  accountId: { type: Schema.Types.ObjectId, required: true },
  snoId: { type: Number, required: true },
  body: { type: String, required: true, maxLength: 500 },
  title: { type: String, required: true, maxLength: 100 },
  imgUrl: { type: String, required: true, maxLength: 500 }
}, {
  timestamps: true,
  toJSON: { virtuals: true }
})