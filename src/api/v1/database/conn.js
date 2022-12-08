const mongoose = require('mongoose')
require('dotenv').config()
mongoose
  .connect(process.env.DATABASE_URL)
  .then((res) => {
    console.log('DATABASE CONNECTED SUCCESSFUL')
  })
  .catch((err) => {
    console.log('DATABASE ERROR', err)
  })
