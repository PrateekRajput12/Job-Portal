const mongoose = require('mongoose')

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    company: {
        type: String,
        required: true,
        trim: true,
    },
    location: {
        type: String,
        required: true,
        trim: true,
    },
    salary: {
        type: String,
        default: "Not Disclosed",
    },
    description: {
        type: String,
        required: true
    },
    applyLink: {
        type: String,
        required: true
    },
    platform: {
        type: String,
        required: true
    },
    postedDate: {
        type: Date,
        default: Date.now
    }

})


const Job = mongoose.model("Job", jobSchema)

module.exports = Job