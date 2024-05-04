const Document = require('../models/Document');
const User = require("../models/User");

const getDocuments = async (req, res) => {
    try {
        // Retrieve all documents from the database
        const documents = await Document.find();
        res.status(200).json(documents);
    } catch (error) {
        console.error("Error fetching documents:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

const uploadDocument = async (req, res) => {
    try {
        // Extract file details from request
        const { originalname, createdBy } = req.body;
        // Find the user who uploaded the document
        const user = await User.findById(createdBy);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Create a new document instance
        const newDocument = new Document({
            name: originalname,
            createdBy: user.username, // Populate createdBy with user name
            uploadDate: new Date(),
            no_of_clicks: 0
        });

        // Save the document to the database
        const savedDocument = await newDocument.save();
        res.status(201).json(savedDocument);
    } catch (error) {
        console.error("Error uploading document:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

module.exports = { getDocuments, uploadDocument };