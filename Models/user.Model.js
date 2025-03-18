const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true

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
// Hashing Password before saving user
userSchema.pre('save', async function (next) {
    if (!this.isModified("password")) return next()

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(this.password, salt)
    next()
})


// Method to chedk password validity

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}


const User = mongoose.model('User', userSchema)

module.exports = User