import { connect } from 'mongoose'
import { connectMongo } from '../../../database/conn'
import {
  getAllUsers,
  insertUser,
  updateUser,
  deleteUser,
} from '../../../database/controllers/userController'
export default async function handler(req, res) {
  const method = req.method
  connectMongo()

  switch (method) {
    case 'GET':
      getAllUsers(req, res)
      break
    case 'POST':
      insertUser(req, res)
      break
    case 'PUT':
      updateUser(req, res)
      break
    case 'DELETE':
      deleteUser(req, res)
      break
    default:
      return res.status(404).json({ message: 'no request napping' })
      break
  }
}
