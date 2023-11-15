const express = require('express');
const friends = express.Router();
const FriendController = require('../controllers/FriendController');
const {sendFriendReq, addFriend} = require('../controllers/FriendController');

friends.get('/sendReq',sendFriendReq);
friends.get('/addFriend',addFriend);

module.exports = friends;