const mongoose = require('mongoose')


const applicationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        required: true
    },
    status: {
        type: String,

        enum: ["Pending", "Applied", "Interview Scheduled", "Rejected"],
        default: "Pending"
    },
    appliedAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true })

const Application = mongoose.model("Application", applicationSchema)

module.exports = Application