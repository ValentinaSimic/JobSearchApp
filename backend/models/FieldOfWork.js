const mongoose = require("mongoose");

const fieldScheme = new mongoose.Schema({
    fieldName: {
        type: String,
        require: true
    }, 
    jobs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "jobs",
    }]
})

module.exports = mongoose.model('FieldOfWork', fieldScheme)