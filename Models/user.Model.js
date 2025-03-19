
// const validator = require('validator')

// const bcrypt = require('bcrypt')

// const jwt = require('jsonwebtoken')
// const mongoose = require('mongoose')


// const userSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     password: {
//         type: String,
//         required: true
//     },
//     profile: {
//         title: String,
//         summary: String,
//         skills: [String],
//         experiece: [
//             {
//                 title: String,
//                 company: String,
//                 location: String,
//                 startDate: Date,
//                 endDate: Date,
//                 description: String,
//                 highlights: [String]
//             }
//         ],
//         education: [
//             {
//                 degree: String,
//                 institution: String,
//                 location: String,
//                 graduationDate: Date,
//                 description: String
//             }
//         ],

//         certifications: [String],
//         preferredLocations: [String],
//         preferredJobTypes: [String]
//     },
//     documents: [{
//         name: String,
//         type: String, // 'resume', 'cover_letter', etc.
//         content: String,
//         file: {
//             data: Buffer,
//             contentType: String
//         },
//         createdAt: {
//             type: Date,
//             default: Date.now
//         }
//     }],
//     preferences: {
//         jobKeywords: [String],
//         companySizes: [String],
//         industries: [String],
//         excludedCompanies: [String],
//         salaryRange: {
//             min: Number,
//             max: Number
//         },
//         applicationVolume: {
//             type: String,
//             enum: ['low', 'medium', 'high'],
//             default: 'medium'
//         }
//     }, createdAt: {
//         type: Date,
//         default: Date.now
//     }

// })


// userSchema.methods.getJWT = async function () {
//     const user = this
//     const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })
//     return token
// }



// userSchema.methods.validatePassword = async (passwordInputByUser) => {
//     const user = this
//     const passwordHash = user.password
//     const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordHash)

//     return isPasswordValid

// }


// module.exports = mongoose.model("User", userSchema)