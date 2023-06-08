import { RequestHandler } from "express"
import Post from "../models/Post";
import User from "../models/User";


/*CREATE */
interface CreatePostProps {
  userId: string;
  description: string;
  picturePath: string;
}
export const createPost: RequestHandler<unknown, unknown, CreatePostProps> = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body
    const user = await User.findById(userId)

    if (user) {
      const newPost = new Post({
        userId,
        firstName: user.firstName,
        lastName: user.lastName,
        location: user.location,
        description,
        userPicturePath: user.picturePath,
        picturePath,
        likes: {},
        comments: []
      })

      await newPost.save()

      const posts = await Post.find()
      res.status(201).json(posts)

    }

  } catch (error) {
    if (error instanceof Error) res.status(500).json({ error: error.message })
    else res.status(500).json('Something wrong when create post')
  }
}

/**READ */
export const getFeedPosts: RequestHandler = async (req, res) => {
  try {

    const posts = await Post.find()
    res.status(200).json(posts)

  } catch (error) {
    if (error instanceof Error) res.status(500).json({ error: error.message })
    else res.status(500).json('Something wrong when get all post')
  }
}

export const getUserPosts: RequestHandler = async (req, res) => {
  try {

    const { userId } = req.params
    const posts = await Post.find({ userId })
    res.status(200).json(posts)


  } catch (error) {
    if (error instanceof Error) res.status(500).json({ error: error.message })
    else res.status(500).json('Something wrong when get posts of user')
  }
}

export const likePost: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params
    const { userId } = req.body

    const post = await Post.findById(id)
    if (post) {
      const isLike = post.likes?.get(userId)
      if (isLike) post.likes?.delete(userId)
      else post.likes?.set(userId, true)

      const updatePost = await Post.findByIdAndUpdate(
        id,
        { likes: post.likes },
        { new: true }
      )
      res.status(200).json(updatePost)
    }
  } catch (error) {
    if (error instanceof Error) res.status(500).json({ error: error.message })
    else res.status(500).json('Something wrong when like post')
  }
}