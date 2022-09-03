import { MyUsers } from '../../../../database/models/userSchema'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { fullName, username, email, password } = req.body

      if (
        !fullName ||
        fullName == '' ||
        !username ||
        username == '' ||
        !email ||
        email == '' ||
        password == '' ||
        !password
      ) {
        return res.status(400).json({
          message: 'invalid inputs please all the fields are required',
          body: req.body,
        })
      }
      const userTobeRegistered = await MyUsers.create(req.body)
      if (!userTobeRegistered) {
        return res
          .status(500)
          .json({ message: 'Some thing went wrong try again' })
      }
      return res
        .status(200)
        .json({ message: 'user registered successfully', userTobeRegistered })
    } catch (error) {
      console.log(error)
    }
  }
}
