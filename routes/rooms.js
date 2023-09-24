//rooms routes
const express = require('express');
const rooms = express.Router();
const {createRoom,SearchRoom} =require("../controllers/roomController");

rooms.post("/create",createRoom);
rooms.get("/search",SearchRoom);
module.exports=rooms; 