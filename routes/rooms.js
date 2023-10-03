//rooms routes
const express = require('express');
const rooms = express.Router();
const {createRoom,SearchRoom,JoinRoom,LeaveRoom} =require("../controllers/roomController");

rooms.post("/create",createRoom);
rooms.get("/search",SearchRoom);
rooms.get("/JoinRoom",JoinRoom);
rooms.get("/leave",LeaveRoom);
module.exports=rooms; 