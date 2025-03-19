import { User } from "../Models/user.Model"
import jwt from 'jsonwebtoken'


export const register = async (req, res) => {
    try {
        const { fullName, email, phoneNumber, password, role } = req.body

        if (!phoneNumber || !fullName || !email || !password || !role) {
            return res.status(401).json({ message: "Something is missing", success: false })
        }


        const user = await User.findOne({ email })

        if (user) {
            return res.status({
                message: "User already exists with this email",
                success: false
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10)  // passswor, slavalyue  ==>to convet password im hash value to secure 


        await User.create({
            fullName,
            email,
            phoneNumber,
            password: hashedPassword,
            role
        })


        return res.status(201).json({
            message: "Account created successfully",
            success: true
        })
    } catch (error) {
        console.log("Error in registering", error);
    }
}


export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body
        if (!email || !password || !role) {
            return res.status(400).json({ message: "Something is missing", success: false })
        }
        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({ message: "Incorrect email or password", success: false })

        }

        const isPasswordMatch = await bcrypt.compare(password, user.password)

        if (!isPasswordMatch) {
            return res.status(400).json({ message: "Incorrect email or password", success: false })

        }

        // Check role is correct or not

        if (role !== user.role) {
            res.status(400).json({
                message: "Account doesn't macthed with current role",
                success: false
            })
        }

        const tokeData = {
            userId: user._id
        }

        const token = await jwt.sign(tokeData, process.env.SECRET_KEY, {
            expiresIn: '1d'
        })

        user = {
            _id: user._id,
            fullName: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpsOnly: true, sameSite: 'strict' }).json({
            message: `Welcome back ${user.fullName}`,
            user,
            success: true
        })

    } catch (error) {
        console.log("error in logining", error);
    }
}


export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logout successfully ",
            success: true
        })
    } catch (error) {
        console.log("Error in logining out", error);
    }
}


export const updateProfile = async (req, res) => {
    try {

        const { fullName, email, phoneNumer, bio, skills } = req.body
        const file = req.file
        if (!email || !fullName || !phoneNumer || !bio || !skills) {
            return res.status(400).json({ message: "Something is missing", success: false })
        }

        // cloudinary ayega idhar  
        const skillsArray = skills.split(",")
        const userId = req.id  // middleware authentication
        let user = await User.findById(userId)

        if (!user) {
            return res.status(400).json(
                {
                    message: "User not found",
                    success: false
                }
            )
        }

        // Updating data
        user.fullname = fullName,
            user.email = email,
            user.bio = bio,
            user.phoneNumber = phoneNumer,
            user.profile.skills = skillsArray
        // resume come letter here.....


        await user.save()

        user = {
            _id: user._id,
            fullName: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }


        return res.status(200).json({ message: "Profile updated successfully", user, success: true })
    } catch (error) {
        console.log("Error in updating ", error);
    }
}