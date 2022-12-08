const userModel = require('./../models/userSchema')
const bcrypt = require('bcryptjs')

const getEmail = async (data) => {
  const email = await userModel.findOne({ email: data.email })
  return email
}

const createUser = async (data) => {
  const user = new userModel({
    name: data.name,
    email: data.email,
    phone: data.phone,
    password: data.password,
    profile: data.profile,
  })
  const newUser = await user.save()
  return newUser
}

const getUsers = async () => {
  const users = await userModel.find({})
  return users
}

module.exports = { getEmail, createUser, getUsers }
