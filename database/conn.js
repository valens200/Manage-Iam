import { MongoClient } from 'mongodb'
import { Mongoose } from 'mongoose'
import mongoose from 'mongoose'
const MONGO_URI = process.env.MONGODB_URI

export const connectMongo = async () => {
  try {
    const connection = await mongoose.connect('mongodb://localhost:27017/crud')
    if (connection) {
      console.log('database connected')
    } else {
      console.log('failed to connect')
    }
  } catch (err) {
    console.log(err)
  }
}
