import { Request, Response, NextFunction } from 'express'
import userModel from '../models/userModel'

interface ISignUpBody {
  username?: string
  email?: string
  password: string
}

export const signUp = async (req: Request, res: Response, next: NextFunction) => {
  const username = req.body.username
  const email = req.body.email
  const passwordRaw = req.body.password

  try {
    if (!username || !email || !passwordRaw) {
      return res.status(400).json({ message: 'Parâmetros faltando!' })
    }

    const existingUser = await userModel.findOne({ email }).exec()
    if (existingUser) {
      return res.status(400).json({ message: 'Email já cadastrado' })
    }

    const existingUsername = await userModel.findOne({ username }).exec()
    if (existingUsername) {
      return res.status(400).json({ message: 'Usuário já cadastrado' })
    }

    const
    res.status(201).json({ message: 'Usuário criado com sucesso!' })
  } catch (error) {
    // next(error) 
  }
}