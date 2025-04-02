import { User } from "../Models/user.Model.js"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import getDataUri from "../utils/datauri.js"
import cloudinary from "../utils/cloudinary.js"
// import getDataUri from "../utils/datauri.js"
// import cloudinary from "../utils/cloudinary.js"
// import { singleUpload } from "../middleware/multer.js"
export const register = async (req, res) => {
    try {
        // console.log(req.file);
        const { fullName, email, phoneNumber, password, role } = req.body
        // console.log(fullName, email, phoneNumber, role, password);
        if (!phoneNumber || !fullName || !email || !password || !role) {
            return res.status(401).json({ message: "Something is missing", success: false })
        }
        // console.log(req.file, "file");
        // const file = req.file
        // const fileUri = getDataUri(file)
        // const cloudResponse = await cloudinary.uploader.singleUpload(fileUri.content)
        const file = req.file
        const fileUri = getDataUri(file)
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content)

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
            role,
            profile: {
                profilePhoto: cloudResponse.secure_url,
            }

        })


        return res.status(201).json({
            message: "Account created successfully",
            success: true
        })
    } catch (error) {
        console.log("Error in registering", error);
    }
}

// export const register = async (req, res) => {
// }

export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body
        if (!email || !password || !role) {
            return res.status(400).json({ message: "Something is missing", success: false })
        }
        let user = await User.findOne({ email })

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

        // console.log({ tokeData });
        const token = jwt.sign(tokeData, process.env.SECRET_KEY, {
            expiresIn: '1d'
        })
        // console.log("token", token);

        user = {
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        // res.status(200).cookie("token", token, {
        //     httpOnly: true,
        //     secure: process.env.NODE_ENV === "production", // Use secure in production
        //     sameSite: "None", // Needed for cross-origin requests
        //     maxAge: 7 * 24 * 60 * 60 * 1000, // 7 Days expiry
        // }).json({
        //     message: `Welcome back ${user.fullName}`,
        //     user,
        //     success: true
        // })

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
        // console.log(req.body);
        const { fullName, email, phoneNumber, bio, skills, resume } = req.body
        // const file = req.file
        // console.log(fullName, email, phoneNumber, bio, skills);
        // console.log(phoneNumer);
        // if (!email || !fullName || !phoneNumer s|| !bio || !skills) {
        //     return res.status(400).json({ message: "Something is missing", success: false })
        // }

        // console.log("Run 1");
        // cloudinary ayega idhar  

        const file = req.file
        const fileUri = getDataUri(file)
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content)


        // let skillsArray;
        // if (skills) {
        //     // skillsArray = skills.split(",")
        //     // skillsArray = skills ? skills.split(",").map(skill => skill.trim()) : [];
        //     skillsArray = Array.isArray(skills) ? skills : [];


        // }
        let skillsArray;
        if (Array.isArray(skills)) {
            skillsArray = skills;  // Already an array, no need to split
        } else if (typeof skills === "string") {
            skillsArray = skills.split(",").map(skill => skill.trim());  // Convert string to array
        } else {
            skillsArray = []; // Default to empty array if skills is missing
        }

        const userId = req.id  // middleware authentication
        let user = await User.findById(userId)
        // console.log("Run 2");
        if (!user) {
            return res.status(400).json(
                {
                    message: "User not found",
                    success: false
                }
            )
        }
        // console.log("Run 3");
        // Updating data
        if (fullName) {
            user.fullName = fullName
        }
        if (bio) {
            user.profile.bio = bio
        }
        if (email) {
            user.email = email
        }
        if (phoneNumber) {
            user.phoneNumber = phoneNumber
        }
        if (skillsArray) {
            user.profile.skills = skillsArray

        }
        if (resume) {
            user.profile.resume = resume
        }

        // resume come letter here.....

        if (cloudResponse) {
            user.profile.resume = cloudResponse.secure_url  //save the cloudinary url
            user.profile.resumeOriginalName = file.originalname //ssave the original file
        }

        // console.log("Run 4");
        await user.save()

        user = {
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            profile: user.profile,

        }

        // console.log("Run 5");
        return res.status(200).json({ message: "Profile updated successfully", user, success: true })
    } catch (error) {
        console.log("Error in updating ", error);
    }
}


export const getUser = async (req, res) => {
    try {
        const Id = req.body
        // console.log(req._id);
        if (!Id) {
            return res.status(400).json({
                message: "User Not authenticated",
                success: false
            })
        }
        const user = await User.find({ Id })
        if (!user) {
            return res.status(400).json({
                message: "User Not authenticated",
                success: false
            })
        }
        return res.status(200).json({
            user,
            success: true
        })
    } catch (error) {
        console.log("err", error);
    }
}