const mongoose = require("mongoose");

const jobScheme = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }, 
    requirements: { 
        type: String,
        required: true
    },
    seniority: {
        type: String,
        required: true
    },
    fulltime: {
        type: Boolean,
        required: true, 
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    tech: {
        type: Array,
        required: true
    },
    fieldOfWork: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'fieldOfWork'
    },
    firm: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'firm'
    }

})

module.exports = mongoose.model('Job', jobScheme)