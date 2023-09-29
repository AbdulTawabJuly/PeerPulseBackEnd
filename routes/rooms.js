//rooms routes
const express = require('express');
const rooms = express.Router();
const {createRoom,SearchRoom,SearchRoomByID} =require("../controllers/roomController");

rooms.post("/create",createRoom);
rooms.get("/search",SearchRoom);
rooms.get("/searchbyid",SearchRoomByID);
module.exports=rooms; 