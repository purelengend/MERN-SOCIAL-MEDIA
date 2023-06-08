import { RequestHandler } from "express"
import User, { UserType } from "../models/User"

/*READ */
export const getUser: RequestHandler = async (req, res) => {
  try {

    const { id } = req.params
    const user = await User.findById(id)

    res.status(200).json(user)

  } catch (error) {
    if (error instanceof Error) res.status(500).json({ error: error.message })
    else res.status(500).json('Something wrong when get user')
  }
}

export const getUserFriends: RequestHandler = async (req, res) => {
  try {

    const { id } = req.params
    const user = await User.findById(id)

    if (user) {
      const friendsDocument = await Promise.all(
        user.friends.map((id) => User.findById(id))
      )

      const friends = friendsDocument.map((friendDocument) => friendDocument?.toObject())

      const formattedFriends = friends.map(
        (friend) => {
          if (friend) {
            const { _id, firstName, lastName, occupation, location, picturePath } = friend
            return { _id, firstName, lastName, occupation, location, picturePath }
          }
        })
      res.status(200).json(formattedFriends)
    }

  } catch (error) {
    if (error instanceof Error) res.status(500).json({ error: error.message })
    else res.status(500).json('Something wrong when get friends of user')
  }
}

/*UPDATE */
export const addRemoveFriend: RequestHandler = async (req, res) => {
  try {

    const { id, friendId } = req.params
    const user = await User.findById(id)
    const friend = await User.findById(friendId)

    if (user && friend) {
      if (user.friends.includes(friendId)) {
        user.friends = user.friends.filter((userId) => userId !== friendId)
        friend.friends = friend.friends.filter((friendId) => friendId !== id)
      }
      else {
        user.friends.push(friendId)
        friend.friends.push(id)
      }

      await user.save()
      await friend.save()

      const friendsDocument = await Promise.all(
        user.friends.map((id) => User.findById(id))
      )

      const friends = friendsDocument.map((friendDocument) => friendDocument?.toObject())

      const formattedFriends = friends.map(
        (friend) => {
          if (friend) {
            const { _id, firstName, lastName, occupation, location, picturePath } = friend
            return { _id, firstName, lastName, occupation, location, picturePath }
          }
        })

      res.status(200).json(formattedFriends)
    }

  } catch (error) {
    if (error instanceof Error) res.status(500).json({ error: error.message })
    else res.status(500).json('Something wrong when add/remove friends of user')
  }
}