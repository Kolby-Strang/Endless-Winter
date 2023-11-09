import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { ValueSchema } from '../models/Value'
import { ResortSchema } from '../models/Resort.js';
import { FavoriteSchema } from '../models/Favorite.js';
import { ReviewSchema } from '../models/Review.js';

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Resort = mongoose.model('Resort', ResortSchema)
  Favorite = mongoose.model('Favorite', FavoriteSchema)
  Review = mongoose.model('Review', ReviewSchema)
}

export const dbContext = new DbContext()
