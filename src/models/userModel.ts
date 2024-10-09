import { InferSchemaType, model, Schema } from 'mongoose'

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    get: obfuscate,
  },
})

function obfuscate(email: String) {
  const separatorIndex = email.indexOf('@')
  if (separatorIndex < 3) {
    // 'ab@gmail.com' -> '**@gmail.com'
    return (
      email.slice(0, separatorIndex).replace(/./g, '*') +
      email.slice(separatorIndex)
    )
  }
  // 'test42@gmail.com' -> 'te****@gmail.com'
  return (
    email.slice(0, 2) +
    email.slice(2, separatorIndex).replace(/./g, '*') +
    email.slice(separatorIndex)
  )
}

type User = InferSchemaType<typeof userSchema>
export default model<User>('User', userSchema)
