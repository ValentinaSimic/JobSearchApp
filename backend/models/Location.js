const mongoose = require("mongoose");

const locationScheme = new mongoose.Schema({
    city: {
        type: String,
        require: true
    }, 
    zipCode: {
        type: String,
        require: true
    },
    firms: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "firms",
    }]
})

module.exports = mongoose.model('Location', locationScheme)