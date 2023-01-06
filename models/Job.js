import mongoose from 'mongoose'

const jobSchema = new mongoose.Schema({

    company: {
        type: String,
        required: [true, "Please Provide Company"],
        maxlength: 50,
    },
    position: {
        type: String,
        required: [true, "Please Provide Position"],
        maxlength: 100,
    },
    status: {
        type: String,
        enum: ['interview', 'pending', 'declined'],
        default: 'pending',
    },
    jobType: {
        type: String,
        enum: ['full-time', 'part-time', 'remote', 'internship'],
        default: 'full-time'
    },
    jobLocation: {
        type: String,
        required: [true, "Please Provide job location"],
        default: 'my-city'
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, "please provide user"]
    },

}, {timestamps: true})

export default mongoose.model('Job', jobSchema)