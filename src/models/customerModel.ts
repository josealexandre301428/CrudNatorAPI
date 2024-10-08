import { InferSchemaType, model, Schema } from 'mongoose'

const customerSchema = new Schema(
  {
    name: { type: String, required: true },
    profile: { type: String, required: true },
    note: { type: String },
  },
  { timestamps: true }
)

type Customer = InferSchemaType<typeof customerSchema>
export default model<Customer>('Customer', customerSchema)
