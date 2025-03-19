// const express = require('express')
// const connectDB = require("./config/database")
// const app = express()

// const cors = require('cors')

// const cookieParser = require('cookie-parser')

// app.use(express.json())
// app.use(cookieParser())

// app.use(cors())


// const { userAuth } = require('./middleware/auth.middleware')


// // const profileRouter=require('./routes/auth.route')
// const authRouter = require('./routes/auth.route')


// app.use('/', authRouter)


// connectDB().then(() => {
//     console.log("DB connection established");
//     app.listen(7070, () => {
//         console.log("Running on port 7070");
//     })
// }).catch((e) => {
//     console.log("Error in connecting BD", e);
// })
import cors from 'cors'
import express from 'express'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import connectDB from './utils/db.js'
import userRoute from './routes/user.Route.js'
dotenv.config()
const app = express()

app.get('/home', (req, res) => {
    return res.status(200).json({
        message: "I am coming from backend",
        success: true
    })
})
// Middle ware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

const corsOption = {
    origin: 'http://localhost:5173',
    credentials: true
}
app.use(cors(corsOption))


const PORT = process.env.PORT || 7070

// Apis

app.use('/api/v1/user', userRoute)




app.listen(PORT, () => {
    connectDB()
    console.log(`Server running at port  ${PORT}`);
})