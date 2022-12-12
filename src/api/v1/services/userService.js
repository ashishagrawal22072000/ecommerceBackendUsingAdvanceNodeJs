const userModel = require('./../models/userSchema')
const bcrypt = require('bcryptjs')

const getEmail = async (data) => {
  const email = await userModel.findOne({ email: data.email })
  return email
}

const getPassword = (data1, data2) => {
  return bcrypt.compare(data1.password, data2)
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

const getUserById = async (id) => {
  const user = await userModel.findById(id)
  return user
}

const deleteUserById = async (id) => {
  const user = await userModel.findByIdAndDelete(id)
  return user
}

const updateUserById = async (req) => {
  const user = await userModel.findById(req.params.id)
  console.log('PATCH', user)
  if (user) {
    const newUser = await userModel.findByIdAndUpdate(
      {
        _id: user._id,
      },
      {
        name: req.body.name || user.name,
        email: req.body.email || user.email,
        phone: req.body.phone || user.phone,
        password: req.body.password || user.password,
        profile: req.body.profile || user.profile,
      },
    )
    const updateUser = await newUser.save()
    return updateUser
  } else {
    return null
  }
}

module.exports = {
  getEmail,
  createUser,
  getUsers,
  getUserById,
  getPassword,
  deleteUserById,
  updateUserById,
}
