import express from 'express'
import { Router, Request, Response } from 'express'
import mongoose from 'mongoose'
import { config } from './config/config'
import postRouter from './routes/postRouter'
import userRoutes from './routes/userRouter'
import bodyParser from 'body-parser';
import cors from 'cors';



const server = express()
const route = Router()
server.use(express.json())
server.use(route)
server.use(express.urlencoded({ limit: '10mb', extended: true }));
server.use(bodyParser.json({ limit: '10mb' }));  // Ajuste o valor conforme necessário
server.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));



mongoose
  .connect(config.mongo.url)
  .then(() => console.log('Connected!'))
  .catch((err) => console.error('Connection error:', err))


server.use('/api/post', postRouter) //Routes for create costumers info
server.use('/api/users', userRoutes) //Routes for login

server.listen(3000, () => console.log(`Server is running on port ${3000}`))
