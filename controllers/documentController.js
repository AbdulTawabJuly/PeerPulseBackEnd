const Document = require('../models/Document');

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
        const { originalname } = req.body;
        const { createdBy } = req.body;

        // Create a new document instance
        const newDocument = new Document({
            name: originalname,
            createdBy,
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