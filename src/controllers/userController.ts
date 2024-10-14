import { Request, Response, NextFunction } from 'express'
import userModel from '../models/userModel'
import bcrypt from 'bcrypt'
import { updateCustomer } from './customerController'

interface ISignUpBody {
  username?: string
  email?: string
  password: string
}

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const username = req.body.username
  const email = req.body.email
  const passwordRaw = req.body.password

  try {
    if (!username || !email || !passwordRaw) {
      res.status(400).json({ message: 'Parameters Missing!' })
    }

    const existingUser = await userModel.findOne({ email }).exec()
    if (existingUser) {
      res.status(400).json({
        message: 'Email already taken. Please Choose a different one.',
      })
    }

    const existingUsername = await userModel.findOne({ username }).exec()
    if (existingUsername) {
      res.status(400).json({
        message: 'User already taken. Please Choose a different one.',
      })
    }

    const passwordHashed = await bcrypt.hash(passwordRaw, 10)

    const newUser = await userModel.create({
      username: username,
      email: email,
      password: passwordHashed,
    })
    res.status(201).json({ message: 'User created sucessfuly!' })
  } catch (error) {
    next(error)
  }
}
