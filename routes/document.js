const express = require('express');
const document = express.Router();
const documentController = require('../controllers/documentController');

document.get('/getDocuments', documentController.getDocuments);
document.post('/uploadDocument', documentController.uploadDocument);
document.get('/getTrendingContributors', documentController.getTrendingContributors);
document.post('/followContributor', documentController.followContributor);
document.get('/incrementCounter', documentController.incrementCounter);
document.get('/getFollowerDocuments', documentController.getFollowerDocuments);
document.get('/getLatestDocuments', documentController.getLatestDocuments);

module.exports = document;