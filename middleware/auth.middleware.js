// const jwt = require('jsonwebtoken')
// const User = require('../Models/user.Model')
// const userAuth = async (req, res, next) => {
//     try {
//         const cookies = req.cookies
//         const { token } = cookies

//         if (!token) {
//             return res.status(401).send("Please Login")
//         }


//         // Validate Token

//         const decodeObj = await jwt.verify(token, process.env.JWT_SECRET)
//         const { _id } = decodeObj

//         const user = await User.findById(_id)

//         if (!user) {
//             throw new Error("Not Authenticated")
//         }
//         req.user = user

//         next()
//     } catch (error) {
//         res.status(401).send("Not Authenticated " + error.message)
//     }
// }


// module.exports = {
//     userAuth
// }