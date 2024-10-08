import { RequestHandler } from 'express'
import customer from '../models/customerModel'
import mongoose from 'mongoose'

export const getAllCustomers: RequestHandler = async (req, res, next) => {
  try {
    const costumers = await customer.find()
    res.status(200).json(costumers)
  } catch (error) {}
}

export const getCustomerById: RequestHandler = async (req, res, next) => {
  try {
    const id = req.params.id
    const costumer = await customer.findById(id)
    res.status(200).json(costumer)
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

export const updateCustomer: RequestHandler = async (req, res, next) => {
  const customerId = req.params.id
  /////////////////////////////////////////
  try {
  } catch (error) {}
}

export const deleteCustomerById: RequestHandler = async (req, res, next) => {
  const customerId = req.params.id

  try {
    const deletedCustomer = await customer.findByIdAndDelete(customerId)
    res.status(200).json(`${deletedCustomer} Deletado com Sucesso!`)
  } catch (error) {}
}
