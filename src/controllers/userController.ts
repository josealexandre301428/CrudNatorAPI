import { Request, Response, NextFunction } from 'express'
import userModel from '../models/userModel'
import bcrypt from 'bcrypt'
import jwt, { Secret, JwtPayload } from 'jsonwebtoken'
import { updateCustomer } from './customerController'
import { get } from 'mongoose'
import { config } from 'dotenv'

require('dotenv').config();


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

export const loginUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => { 
  const { email, password} = req.body

 
  if (!email){ 
  res.status(422).json({ message: "Type your email"})
  }

  if (!password){ 
    res.status(422).json({ message: "Type your passsword"})
  }

  const user = await userModel.findOne({email: email}).exec()
  console.log(user)
  if(!user){
    res.status(422).json({ message: "User not found"})
  }

  if (!user || !user.password) {
    throw new Error("User not found or password is missing");
  }
  
  const checkPassword = await bcrypt.compare(password, user.password);

  if (checkPassword){
  

}
}

export const getAllUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => { 
  try {
    const users = await userModel.find()
    res.status(200).json({ users });
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => { 
  try {
    const {id} = req.params
    const userById = await userModel.findById(id)
    res.status(200).json({ userById });
  } catch (error) {
   next(error) 
  }
}
