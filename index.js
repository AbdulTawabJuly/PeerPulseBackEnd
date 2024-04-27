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
const friends = require("./routes/friends")
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();
// app.use(bodyParser.json());
const multer = require('multer');
const path = require('path');

// ...

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads'); // Specify the directory where you want to store the files
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });
app.use(cors()); // This allows all origin
app.post('/upload', upload.single('file'), (req, res) => {
  const file = req.file;
  console.log("file uploaded to server");
  console.log(req.file);
  res.json({ success: true, message: 'File uploaded successfully.', identifier:file.originalname });
});

app.use(express.json({limit:'10mb'}));
app.use("/api/auth", auth);
app.use("/api/room", rooms);
app.use("/api/friend",friends);
app.use('/api/files', express.static(path.join(__dirname, 'uploads')));
app.get('/api/files/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, 'uploads', filename); // Adjust the path accordingly
  res.download(filePath, (err) => {
    if (err) {
      console.error('Error downloading file:', err);
      res.status(500).json({ success: false, message: 'Internal Server Error.' });
    }
  });
});
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
const PORT = process.env.PORT || 8080;

io.on("connection", (socket) => {
  socket.on("join-room", (room, user) => {
    socket.join(room);
    socket.to(room).emit("user-joined", user);
  });

  socket.on("leave-room", (user, room) => {
    socket.to(room).emit("user-left", user);
    console.log("user left in backednd")
  });

  socket.on("send-message", (message, room) => {
    socket.to(room).emit("recieve-message", message);
  });
  socket.on("kick-user",(user,room)=>{
    socket.to(room.id).emit("Kick-User",user);
  });
  socket.on("ban-user",(user,room)=>{
    socket.to(room.id).emit("Ban-User",user);
  });
  socket.on("toggle-mic",(user,micstate,room)=>{
    socket.to(room.id).emit("Toggle-Mic",user,micstate);
  });
  socket.on("make-moderator",(user,userID,room)=>{
    socket.to(room.id).emit("Make-Moderator",user,userID);
  });
  socket.on("remove-moderator",(user,userID,room)=>{
    socket.to(room.id).emit("Remove-Moderator",user,userID);
  });
  socket.on("drawing", (data, room) => {
    // data could include things like coordinates, color, width, etc.
    socket.to(room.roomID).emit("drawing", data);
  });
  socket.on("startDrawing", (data,room) => {
    socket.to(room.roomID).emit("startDrawing", data);
  });

  socket.on("stopDrawing", (room) => {
    socket.to(room).emit("stopDrawing");
  });
  
});

//Stripe Integration
const stripe = require("stripe")(
  "sk_test_51NoQGmSDkACrq3oOCKvupOYTvJadCs6ErCYcArqHezd5zJcsJ3gRq97t6CVBLEbOi5TLSKpRomIDJ0muzRL9a5lq003WgZV7oc"
);
const calculateOrderAmount = (items) => {
  return items;
};

app.post("/create-payment-intent", async (req, res) => {
  const { totalAmount } = req.body;
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: totalAmount * 100, //Current Indian Currency Rate
    currency: "inr",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
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
}, 1000 * 60);
