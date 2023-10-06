const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { DeleteExpiredRooms } = require("./controllers/roomController");
// const bodyParser = require("body-parser");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const auth = require("./routes/auth");
const rooms = require("./routes/rooms");
const cors = require("cors");
require("dotenv").config();
// app.use(bodyParser.json());
app.use(cors()); // This allows all origin
app.use(express.json());
app.use("/api/auth", auth);
app.use('/api/room',rooms);
const io = new Server(server,{
  cors:{
    origin:"*"
  }
});
const PORT = process.env.PORT || 8080;


io.on("connection", (socket) => {
  console.log("user connected: ",socket.id);

  socket.on('join-room',(room,user)=> {
    socket.join(room);
    console.log(`socket ${socket.id} joined room: ${room}`);
    socket.to(room).emit('user-joined',user);
  })

  socket.on('message-sent',(message,room)=> {
    socket.to(room).emit('recieve-message',message);
  })

  socket.on('disconnect',()=> {
    console.log(`user left: ${socket.id}`);
  })

});


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    server.listen(PORT, () => {
      console.log("listening on PORT: ", PORT, " and connected to database");
    });
  })
  .catch((error) => {
    console.log("error occured connecting to mongoose");
  });

setInterval(() => {
    DeleteExpiredRooms();
}, 1000*60);
