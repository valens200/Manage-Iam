import { models, model, Schema } from 'mongoose'

const userSchema = new Schema({
  fullname: String,
  username: String,
  email: String,
  password: String,
  isAdmin: { type: String, default: true },
})

export const MyUsers = models.MyUsers || model('MyUsers', userSchema)
