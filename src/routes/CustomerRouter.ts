import { Router } from 'express'
import express from 'express'
import {
  createCustomer,
  getCustomerById,
  getAllCustomers,
  updateCustomer,
  deleteCustomerById,
} from '../controllers/customerController'

const router = express.Router()

router.get('/', getAllCustomers)
router.get('/:id', getCustomerById)
router.post('/createCustomer', createCustomer)
router.patch('/:id', updateCustomer)
router.delete('/:id', deleteCustomerById)

export { router }
