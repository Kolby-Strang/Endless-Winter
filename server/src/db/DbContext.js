import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { ValueSchema } from '../models/Value'
import { ResortSchema } from '../models/Resort.js';
import { FavoriteSchema } from '../models/Favorite.js';
import { ReviewSchema } from '../models/Review.js';
import { PostSchema } from "../models/Post.js";
import { CommentSchema } from '../models/Comment.js';

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Resort = mongoose.model('Resort', ResortSchema)
  Favorite = mongoose.model('Favorite', FavoriteSchema)
  Review = mongoose.model('Review', ReviewSchema)
  Post = mongoose.model('Post', PostSchema)
  Comment = mongoose.model('Comment', CommentSchema)
}

export const dbContext = new DbContext()
