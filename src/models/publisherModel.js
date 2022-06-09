const mongoose = require('mongoose');

const publisherSchema = new mongoose.Schema( {
    publisher_id: Number,
    name: String,
headQuarter: String,

}, { timestamps: true });

module.exports = mongoose.model('Shubham1', publisherSchema)