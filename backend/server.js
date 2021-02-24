const express = require('express')
require('dotenv').config()
const cookieParser = require('cookie-parser')
const DB = require('./config/db')
const {userRouter, todoRouter} = require('./routes')
const cors = require('cors')

const app = express()

// Middlewares
app.use(cors({ origin: (origin, callback) => callback(null, true), credentials: true }))
app.use(express.json({extended: true}))
app.use(express.urlencoded({extended: false}))


// Routes section
app.use('/api/users', userRouter)
app.use('/api/todos', todoRouter)



// PORT connection
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})



// DB connection
const startDB = async () => {
  try {
    await DB.authenticate()
    await DB.sync()
  } catch (e) {
    console.log(e)
  }
}

startDB()