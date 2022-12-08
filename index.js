const express = require('express')
require('dotenv').config()
require('././src/api/v1/database/conn')
const PORT = process.env.PORT
const app = express()
app.use(express.json())
app.use(
  express.urlencoded({
    extended: true,
  }),
)

const user = require('./src/api/v1/routers/userRouter')

app.use('/api/v1/user', user)

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`)
})
