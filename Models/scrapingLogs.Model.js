const mongoose = require("mongoose")

const jobScrapingTrackerSchema = new mongoose.Schema({
    platform: {
        type: String,
        required: true,
        unique: true,
    },
    lastScrapedAt: {
        type: Date,
        default: Date.now
    }
},
    { timestamps: true })


const JobScrapingTracker = mongoose.model("JobScrapingTracker", jobScrapingTrackerSchema)

module.exports = JobScrapingTracker