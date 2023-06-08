import bcrypt from 'bcrypt'
import { RequestHandler } from 'express'
import jwt from 'jsonwebtoken'
import User, { UserType } from '../models/User'
import { UserDTO } from '../models/dto/UserDTO'

/*Register User */
export const register: RequestHandler<
  unknown,
  unknown,
  UserType,
  unknown
> = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
    } = req.body

    const salt = await bcrypt.genSalt()
    const passwordHash = await bcrypt.hash(password, salt)

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath,
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 10000),
      impressions: Math.floor(Math.random() * 10000),
    })

    const savedUser = await newUser.save()

    res.status(201).json(savedUser)

  } catch (error) {
    if (error instanceof Error) res.status(500).json({ error: error.message })
    else res.status(500).json('Something wrong when register user')
  }
}

/*Log in */
interface LoginProps {
  email: string;
  password: string;
}

export const login: RequestHandler<unknown, unknown, LoginProps> = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (!user) return res.status(404).json('User not found')

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) return res.status(401).json('Invalid credentials')

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!)

    res.status(200).json({ token, user })

  } catch (error) {
    if (error instanceof Error) res.status(500).json({ error: error.message })
    else res.status(500).json('Something wrong when logging in')
  }
}
