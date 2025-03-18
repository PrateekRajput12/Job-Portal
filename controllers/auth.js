const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt")
const User = require('../Models/user.Model')


exports.register = async (req, res) => {
    try {
        const { email, password, name } = req.body

        // check if user already exist

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" })
        }

        // Hash Pasword

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = new User({
            name,
            email,
            password: hashedPassword
        })

        await User.save()

        return res.status(201).json({
            token, user: {
                id: user._id,
                email: user.email,
                name: user.name
            }
        })
    } catch (error) {
        console.error("Registration error:", error)
        res.status(500).json({ message: "Server Error" })
    }
}


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body

        // Find User By email

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "Invalid Credential in finding user by email" })
        }

        const isPasswordValid = await user.validatePassword(password)
        if (isPasswordValid) {
            const token = await user.getJWT()
            console.log(token);

            res.cookie("token", token, {
                expires: new Date(Date.now() + 900000)
            })
            res.send("Login SuccessFul")
        } else {
            throw new Error("Invalid credentials")
        }

    } catch (error) {
        res.status(400).send("Error : " + error.message)
    }
}

exports.logout = async (req, res) => {
    res.cookie("token", null, {
        expires: new Date(Date.now())
    }).send("Logout successful")
}



