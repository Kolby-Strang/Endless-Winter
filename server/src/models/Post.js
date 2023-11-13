import { Schema } from "mongoose";

export const PostSchema = new Schema({
  accountId: { type: Schema.Types.ObjectId, required: true },
  snoId: { type: Number, required: true },
  body: { type: String, required: true, maxLength: 500 },
  title: { type: String, required: true, maxLength: 100 },
  imgUrl: { type: String, maxLength: 500 }
}, {
  timestamps: true,
  toJSON: { virtuals: true }
})

PostSchema.virtual('account', {
  localField: "accountId",
  foreignField: "_id",
  ref: "Account",
  justOne: true
})

PostSchema.virtual('likes', {
  localField: '_id',
  foreignField: 'thingId',
  ref: 'Like'
})