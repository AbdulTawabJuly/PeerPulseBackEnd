const mongoose = require('mongoose');

// Define the schema for the Document model
const documentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user', // Reference to the User model
        required: true
    },
    uploadDate: {
        type: Date,
        default: Date.now
    },
    noOfClicks: {
        type: Number,
        default: 0
    }
});

// Create the Document model
const Document = mongoose.model('Document', documentSchema);

module.exports = Document;
