import { connectMongo } from '../conn'
import { Users } from '../models/userModel'

export const getAllUsers = async (req, res) => {
  try {
    const users = await Users.find({})
    if (users == '') {
      return res.status(404).json({ users: 'users registry is empty' })
    } else {
      return res.status(200).json({ users: users })
    }
  } catch (err) {
    console.log(err)
  }
}

//inserting new data
export const insertUser = async (req, res) => {
  try {
    const { salary, birthday, name, email } = req.body
    if (
      !name ||
      name == '' ||
      !email ||
      email == '' ||
      !salary ||
      salary == '' ||
      birthday == '' ||
      !birthday
    ) {
      return res.status(400).json({
        message: 'invalid inputs please all the fields are required',
        body: req.body,
      })
    }

    const createdUser = await Users.create(req.body)
    if (!createdUser) {
      return res
        .status(500)
        .json({ message: 'some thing webt wrong try again' })
    } else {
      return res
        .status(200)
        .json({ message: 'user created successfully', createdUser })
    }
  } catch (err) {
    console.log(err)
  }
}

//updating database

export const updateUser = async (req, res) => {
  try {
    const id = req.query
    console.log(id)
    const { name, email, salary, birthday } = JSON.parse(req.body)
    if (
      !name ||
      name == '' ||
      !email ||
      email == '' ||
      !salary ||
      salary == '' ||
      birthday == '' ||
      !birthday
    ) {
      return res
        .status(400)
        .json({ message: 'invalid inputs please all the fields are required' })
    }

    const availableUser = await Users.findOneAndUpdate(id, req.body)
    if (!availableUser) {
      return res.status(404).json({ message: 'user not found' })
    } else {
      res
        .status(200)
        .json({ message: 'user updated successfully ', availableUser })
    }
  } catch (err) {
    console.error(err)
  }
}

//deleting a user from the database

export const deleteUser = async (req, res) => {
  try {
    const id = req.query

    const UserTodelete = await Users.findOneAndDelete({ id })
    if (!UserTodelete) {
      return res.status(400).json({ message: 'internal server error' })
    } else {
      return res
        .status(200)
        .json({ message: 'user deleted successfully', UserTodelete })
    }
  } catch (error) {
    console.log(error)
  }
}
