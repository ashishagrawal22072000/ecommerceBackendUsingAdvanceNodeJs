const userModel = require("./../models/userSchema");
const bcrypt = require("bcryptjs");

const getEmail = async (data) => {
  const email = await userModel.findOne({ email: data.email });
  return email;
};

const getPassword = (data1, data2) => {
  return bcrypt.compare(data1.password, data2);
};
const createUser = async (data) => {
  const user = new userModel({
    name: data.name,
    email: data.email,
    phone: data.phone,
    password: data.password,
    profile: data.profile,
  });
  const newUser = await user.save();
  return newUser;
};

const getUsers = async () => {
  const users = await userModel.find({});
  return users;
};

const getUserById = async (id) => {
  const user = await userModel.findById(id);
  return user;
};

module.exports = { getEmail, createUser, getUsers, getUserById, getPassword };
