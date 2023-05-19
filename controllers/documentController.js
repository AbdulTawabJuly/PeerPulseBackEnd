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

const getTrendingContributors = async (req, res) => {
    try {
        const users = await User.find().select('name _id').populate({ 
            path: 'followers', 
            select: '_id' 
        });
        users.sort((a, b) => b.followers.length - a.followers.length);
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

const followContributor = async (req, res) => {
    try {
        const { userId, followerId } = req.body;

        // Find the user to follow
        const userToFollow = await User.findById(userId);
        if (!userToFollow) {
            return res.status(404).json({ success: false, message: "User to follow not found" });
        }

        // Check if the user is already following the other user
        const isAlreadyFollowing = userToFollow.followers.includes(followerId);

        if (isAlreadyFollowing) {
            // If already following, unfollow
            const index = userToFollow.followers.indexOf(followerId);
            userToFollow.followers.splice(index, 1);
        } else {
            // If not following, follow
            userToFollow.followers.push(followerId);
        }

        await userToFollow.save();

        res.status(200).json({ success: true, message: isAlreadyFollowing ? "User unfollowed successfully" : "User followed successfully" });
    } catch (error) {
        console.error('Error following contributor:', error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};


const incrementCounter = async (req, res) => {
    try {
        const { id } = req.query;
        const document = await Document.findById(id);
        if (!document) {
            return res.status(404).json({ success: false, message: "Document not found" });
        }

        document.noOfClicks++;
        await document.save();

        res.status(200).json({ success: true, message: "Counter incremented successfully" });
    } catch (error) {
        console.error('Error incrementing counter:', error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

const getFollowerDocuments = async (req, res) => {
    try {
        const { userId } = req.query;

        // Find all users where the followers array contains the userId
        const users = await User.find({ followers: userId }).select('username');

        // Extract usernames from the result
        const usernames = users.map(user => user.username);

        // Retrieve documents where 'createdBy' matches any of the extracted usernames
        const documentsCreatedByFollowers = await Document.find({ createdBy: { $in: usernames } });

        res.status(200).json(documentsCreatedByFollowers);
    } catch (error) {
        console.error('Error fetching follower documents:', error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

const getLatestDocuments = async (req, res) => {
    try {
        const documents = await Document.find().sort({ uploadDate: -1 }).limit(10);
        res.status(200).json(documents);
    } catch (error) {
        console.error('Error fetching latest documents:', error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

module.exports = { getDocuments, uploadDocument, getTrendingContributors, followContributor, incrementCounter, getFollowerDocuments, getLatestDocuments };