const mongoose = require("mongoose");

const firmScheme = new mongoose.Schema({
    firmName: {
        type: String,
        require: true
    }, 
    firmImage: {
        type: String,
        require: true
    },
    jobs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'jobs'
    }],
    location: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'location'
    }
})

module.exports = mongoose.model('Firm', firmScheme)