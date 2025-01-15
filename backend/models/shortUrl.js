const mongoose = require("mongoose");

const shortUrlSchema = new mongoose.Schema({
    fullUrl: {
        type: String,
        required: true,
    },
    shortUrl: {
        type: String,
        unique: true,
        required: true,
    },
    clicks: {
        type: Number,
        default: 0,
    },
});
module.exports = mongoose.model('ShortUrl', shortUrlSchema);
