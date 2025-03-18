const mongoose = require("mongoose")

const aiOptimizedResumeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    originalResume: {
        type: String,
        required: true,
    },
    optimizedResume: {
        type: String,
        required: true,
    },
    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
        required: true

    },
    dataOptimized: {
        type: Date,
        default: Date.now()
    }
}
    ,
    { timestamps: true }
)


const AIOptimizedResume = ("AIOptimizedResume", aiOptimizedResumeSchema)

module.exports = AIOptimizedResume