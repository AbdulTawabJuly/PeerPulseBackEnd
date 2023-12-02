const express = require('express');
const friends = express.Router();
const FriendController = require('../controllers/FriendController');
const {sendFriendReq, addFriend, declineReq, removeFriend, blockFriend, getNotifications, getFriends, unBlock} = require('../controllers/FriendController');

friends.get('/sendReq',sendFriendReq);
friends.get('/addFriend',addFriend);
friends.get('/declineReq',declineReq);
friends.get('/removeFriend',removeFriend);
friends.get('/blockFriend',blockFriend);
friends.get('/unBlock',unBlock);
friends.get('/getNotifications',getNotifications);
friends.get('/getFriends',getFriends);

module.exports = friends;