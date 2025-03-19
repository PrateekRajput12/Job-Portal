// const express = require('express')

// const authRouter = express.Router()

// const User = require('../Models/user.Model')

// const { validateSignUpData } = require('../utils/validator')
// const bcrypt = require('bcrypt')

// authRouter.post("/signup", async (req, res) => {
//     try {
//         const { password } = req.body

//         validateSignUpData(req)

//         // Encypt the password
//         const passwordHash = await bcrypt.hash(password, 10)


//         const user = new User({
//             name: req.body.name,
//             email: req.body.email,
//             password: passwordHash
//         })

//         await user.save()

//         res.send("Done")
//     } catch (error) {
//         res.status(400).send("Error in savin Data " + error.message)
//     }
// })


// authRouter.post('/login', async (req, res) => {
//     try {
//         const { email, password } = req.body
//         const user = await User.findOne({ email: email })
//         if (!user) {
//             throw new Error()
//         }

//         const isPasswordValid = await user.validatePassword(password)

//         if (isPasswordValid) {
//             const token = await user.getJWT()

//             res.cookie("token", token, {
//                 expires: new Date(Date.now() + 900000)
//             })
//             res.send(user)
//         }
//         else {
//             throw new Error("Invalid credential")
//         }
//     } catch (error) {
//         res.status(400).send("Error : " + error.message)
//     }
// })



// authRouter.post("/logout", async (req, res) => {
//     res.cookie("token", null, {
//         expires: new Date(Date.now())
//     }).send("Logout SuccessFull")
// })

// module.exports = authRouter