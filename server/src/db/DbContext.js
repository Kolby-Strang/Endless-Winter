import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { ValueSchema } from '../models/Value'
import { ResortSchema } from '../models/Resort.js';

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Resort = mongoose.model('Resort', ResortSchema)
}

export const dbContext = new DbContext()
