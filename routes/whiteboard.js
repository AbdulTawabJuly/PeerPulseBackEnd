const express = require('express');
const whiteboard = express.Router();
const whiteboardController = require('../controllers/whiteboardController');
//const {addMember, removeMember, getMembers} = require('../controllers/whiteboardController');

//whiteboard.get('/members',getMembers);

module.exports = whiteboard;