const express = require("express");
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const mongoose = require('mongoose');

require('dotenv').config();

const io = new Server(server)
const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.json({ status: "Success" });
});

io.on("connection", (socket)=> {
  console.log("user connected");
})

mongoose.connect(process.env.MONGO_URI)
  .then(()=> {
      server.listen(PORT, () => {
        console.log("listening on PORT: ",PORT, ' and connected to database');
      });
  })
  .catch((error)=> {
    console.log('error occured connecting to mongoose');
  })


