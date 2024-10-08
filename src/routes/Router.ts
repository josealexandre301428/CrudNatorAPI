import { Router } from 'express'
import express from 'express'
import { createCustomer, getCustomers } from '../controllers/customerController'

const router = express.Router()

router.get('/', getCustomers)
router.post('/createCustomer', createCustomer)

export { router }
