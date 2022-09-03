import { MyUsers } from '../../../../database/models/userSchema'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    console.log(req.body)
    try {
      const { email, password } = req.body

      if (!email || email == '' || password == '' || !password) {
        return res.status(400).json({
          message: 'invalid inputs please all the fields are required',
          body: req.body,
        })
      }
      const userToLoggedIn = await MyUsers.findOne({ email })
      if (!userToLoggedIn) {
        return res.status(500).json({ message: 'Invalid email or password' })
      }
      return res
        .status(200)
        .json({ message: 'loggedIn successfully', userToLoggedIn })
    } catch (error) {
      console.log(error)
    }
  }
}
