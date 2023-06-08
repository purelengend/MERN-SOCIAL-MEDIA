import { verifyToken } from './middlewares/auth';
import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import helmet from 'helmet'
import morgan from 'morgan'
import path from 'path'
import { fileURLToPath } from 'url'
import multer from 'multer'
import { register } from './controllers/auth'
import authRoutes from './routes/auth'
import userRoutes from './routes/users'
import postRoutes from './routes/posts'
import { createPost } from './controllers/posts';
import User from './models/User';
import Post from './models/Post';
import { users, posts } from './data/index'
/*Configuration */
const filename = fileURLToPath(require('url').pathToFileURL(__filename).toString())
const dirname = path.dirname(__filename)

dotenv.config()

const app = express()

app.use(express.json())

app.use(helmet())

app.use(helmet.crossOriginResourcePolicy({
  policy: 'cross-origin'
}))

app.use(morgan('common'))

app.use(bodyParser.json({ limit: '30mb' }))

app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))

app.use(cors())

app.use('/', express.static(path.join(__dirname, 'public/assets')))

/*File storage */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/assets')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage })

/* Routes with files */
app.post('/auth/register', upload.single('picture'), register)
app.post('/posts', verifyToken, upload.single('picture'), createPost)

/* Routes */
app.use('/auth', authRoutes)
app.use('/users', userRoutes)
app.use('/posts', postRoutes)

/*Mongoose setup */
const PORT = process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URL!)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server PORT: ${PORT}`)
      console.log(path.join(__dirname, 'public/assets'))

      /*ADD DATA one time */
      // User.insertMany(users)
      // Post.insertMany(posts)
    })
  })
  .catch(err => console.error(err))
