import mongoose from 'mongoose'

const PostSchema = new mongoose.Schema({
  userId: { type: 'string', required: true },
  firstName: { type: 'string', required: true },
  lastName: { type: 'string', required: true },
  location: String,
  description: String,
  picturePath: String,
  userPicturePath: String,
  likes: { type: Map, of: Boolean },
  comments: { type: Array, default: [] }
}, {
  timestamps: true,
})

export type PostType = mongoose.InferSchemaType<typeof PostSchema>

const Post = mongoose.model<PostType>('Post', PostSchema)

export default Post