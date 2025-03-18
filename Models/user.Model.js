const mongoose = require("mongoose")
const jwt = require('jsonwebtoken')
const validator = require('validator')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid Email address: " + value)
            }
        }
    },
    password: {
        type: String,
        required: true,


    },
    resume: {
        type: String
    },
    jobPrefrences: {
        type: Object,
        default: {}

    },
    skiils: {
        type: [String]
    },
    location: {
        type: String
    },
    salaryRange: {
        type: String
    },
    appliedJobs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job'
    },
    ],

}, { timestamps: true }

)

userSchema.methods.getJWT = async function () {
    const user = this
    const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d"
    })
    return token
}
// Hashing Password before saving user
// userSchema.pre('save', async function (next) {
//     if (!this.isModified("password")) return next()

//     const salt = await bcrypt.genSalt(10)
//     const hashedPassword = await bcrypt.hash(this.password, salt)
//     next()
// })


// Method to chedk password validity



userSchema.methods.validatePassword = async function (passwordInputByUser) {
    const user = this
    const passwordHash = this.password
    const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordHash)

    return isPasswordValid
}


const User = mongoose.model('User', userSchema)

module.exports = User