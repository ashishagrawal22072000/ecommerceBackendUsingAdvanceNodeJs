const userModel = require('./../models/userSchema')
const bcrypt = require('bcryptjs')
const grid = require('gridfs-stream')
const mongoose = require('mongoose')
let gfs

const conn = mongoose.connection
conn.once('open', () => {
  gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: 'fs',
  })
  gfs = grid(conn.db, mongoose.mongo)
  gfs.collection('fs')
})
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

const getImageUrl = (req) => {
  if (req.file) {
    return `${process.env.MAIN_URL}/user/image/${req.file.filename}`
  } else {
    return null
  }
}

const getImage = async (fileName) => {
  const file = await gfs.files.findOne({ filename: fileName })
  return file
}

const readImage = async (id) => {
  return await gridfsBucket.openDownloadStream(id)
}

module.exports = {
  getEmail,
  createUser,
  getUsers,
  getUserById,
  getPassword,
  deleteUserById,
  updateUserById,
  getImageUrl,
  getImage,
  readImage,
}
