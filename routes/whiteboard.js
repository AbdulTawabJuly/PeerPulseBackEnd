const express = require('express');
const whiteboard = express.Router();
const whiteboardController = require('../controllers/whiteboardController');
//const {addMember, removeMember, getMembers} = require('../controllers/whiteboardController');
const {getMembers, addMember, removeMember} = require('../controllers/whiteboardController');

whiteboard.get('/members',getMembers);
whiteboard.post('/member',addMember);
whiteboard.delete('/member',removeMember);

module.exports = whiteboard;