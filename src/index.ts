import express from 'express'
import { Router, Request, Response } from 'express'
import mongoose from 'mongoose'
import { config } from './config/config'
import { router } from './routes/Router'

const server = express()
const route = Router()
server.use(express.json())
server.use(route)

mongoose
  .connect(config.mongo.url)
  .then(() => console.log('Connected!'))
  .catch((err) => console.error('Connection error:', err))

route.get('/', (req: Request, res: Response) => {
  res.json({ message: 'hello world' })
})

server.use('/api/customers', router)

route.get('/', (req: Request, res: Response) => {})

server.listen(3000, () => console.log(`Server is running on port ${3333}`))
