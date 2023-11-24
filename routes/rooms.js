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

module.exports = rooms;
