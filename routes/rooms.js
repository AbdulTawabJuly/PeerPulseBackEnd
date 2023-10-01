//rooms routes
const express = require('express');
const rooms = express.Router();
const {createRoom,SearchRoom,JoinRoom} =require("../controllers/roomController");

rooms.post("/create",createRoom);
rooms.get("/search",SearchRoom);
rooms.get("/JoinRoom",JoinRoom);
module.exports=rooms; 