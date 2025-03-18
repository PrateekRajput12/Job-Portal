const mongoose = require('mongoose')


const connectDB = async () => {
    console.log(process.env.MONGODB_URL);
    await mongoose.connect(process.env.MONGODB_URL)
        .then(() => console.log("MongoDB connected"))
        .catch((e) => console.log("MongoDB connection error: ", e))
}

module.exports = connectDB