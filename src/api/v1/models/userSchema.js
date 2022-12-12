const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, `Name is required`],
    minlength: [5, `Name can't be smaller than 5 charactors`],
    maxlength: [20, `Name can't be larger tthan 20 charactors`],
  },
  email: {
    type: String,
    required: [true, `Email is required`],
    index: true,
  },
  phone: {
    type: String,
    required: [true, `Phone is required`],
    minlength: [10, `Phone can't be less than 10 digits`],
    maxlength: [10, `Phone can't be larger than 10 digits`],
  },
  password: {
    type: String,
    required: [true, `Password is required`],
    minlength: [8, `Password can't be smaller than 8 characters`],
    maxlength: [64, `Password can't be larger than 64 characters`],
  },
  profile: {
    type: String,
    required: [true, `Profile Image is required`],
  },
  isEmailVarified: {
    type: Boolean,
    default: false,
  },
})

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10)
  }
  next()
})
const userModel = mongoose.model('USER', userSchema)

module.exports = userModel
