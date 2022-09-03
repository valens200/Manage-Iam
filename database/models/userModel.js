import { Schema, models, model } from 'mongoose'

const userSchema = new Schema({
  name: String,
  email: String,
  salary: Number,
  birthday: String,
})
export const Users = models.Users || model('Users', userSchema)
