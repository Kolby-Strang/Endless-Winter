import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const AccountSchema = new Schema(
  {
    subs: [{ type: String, unique: true }],
    email: { type: String, lowercase: true, unique: true },
    name: { type: String, required: true },
    picture: { type: String },
    resortAdmin: { type: Number },
    isOwner: { type: Boolean, required: true, default: false },
    skier: { type: Boolean, required: true, default: false },
    snowBoarder: { type: Boolean, required: true, default: false },
    pinnedFavorite: { type: Number, required: true, default: '' }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

AccountSchema.virtual('favorites', {
  localField: '_id',
  foreignField: 'accountId',
  ref: 'Favorite'
})