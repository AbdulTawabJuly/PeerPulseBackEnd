//rooms routes
const express = require("express");
const rooms = express.Router();
const {
  createRoom,
  SearchRoom,
  JoinRoom,
  LeaveRoom,
  BanUser,
  getRoom,
  sendInvoice,
  MakeModerator,
  RemoveModerator,
  GetRoomsOfUser,
  SearchSuggestedRooms,
} = require("../controllers/roomController");

rooms.post("/create", createRoom);
rooms.get("/search", SearchRoom);
rooms.get("/JoinRoom", JoinRoom);
rooms.get("/leave", LeaveRoom);
rooms.get("/getRoom", getRoom);
rooms.post("/send-invoice", sendInvoice);
rooms.get("/banuser",BanUser);
rooms.get("/makemoderator",MakeModerator);
rooms.get("/removemoderator",RemoveModerator);
rooms.get("/get-rooms",GetRoomsOfUser);
rooms.get("/search-sugg-rooms",SearchSuggestedRooms);

module.exports = rooms;
