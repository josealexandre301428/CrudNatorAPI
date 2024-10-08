import { RequestHandler } from 'express'
import customer from '../models/customer'

export const getCustomers: RequestHandler = async (req, res, next) => {
  try {
    const costumers = await customer.find()
    res.status(200).json(costumers)
  } catch (error) {}
}

export const createCustomer: RequestHandler = async (req, res, next) => {
  const name = req.body.name
  const profile = req.body.profile
  const note = req.body.note

  try {
    const newCustomer = await customer.create({
      name: name,
      profile: profile,
      note: note,
    })
    res.status(201).json(newCustomer)
  } catch (error) {}
}
