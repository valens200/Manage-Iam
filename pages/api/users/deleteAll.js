import { Users } from '../../../database/models/userModel'
export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    try {
      const deletedUsers = await Users.deleteMany({})
      if (!deletedUsers) {
        return res.status(200).json({ message: 'Some thing went wrong' })
      } else {
        return res.status(200).json({ message: 'users deleted ' })
      }
    } catch (error) {
      console.log(error)
    }
  }
}
