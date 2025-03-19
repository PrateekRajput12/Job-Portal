import { User } from "../Models/user.Model"



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
    } catch (error) {
        console.log("Error in registering", error);
    }
}