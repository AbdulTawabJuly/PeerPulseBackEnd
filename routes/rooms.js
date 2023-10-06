//rooms routes
const express = require('express');
const rooms = express.Router();
const {createRoom,SearchRoom,JoinRoom,LeaveRoom, getRoom} =require("../controllers/roomController");

rooms.post("/create",createRoom);
rooms.get("/search",SearchRoom);
rooms.get("/JoinRoom",JoinRoom);
rooms.get("/leave",LeaveRoom);
rooms.get("/getRoom",getRoom);
module.exports=rooms; 