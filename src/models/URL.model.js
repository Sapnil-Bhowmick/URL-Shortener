const mongoose = require("mongoose")

const urlSchema = new mongoose.Schema({
    originalUrl: {
        type: String,
        required: [true , "Original URL is required."]
    },
    shortCode: {
        type: String,
        required: [true, "Short code is required."],
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    clicks: {
        type: Number,
        default: 0
    },
});


const URL_Model = mongoose.model('Url', urlSchema);

module.exports = URL_Model