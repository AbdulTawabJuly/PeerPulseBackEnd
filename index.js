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
app.use("/api/room", rooms);
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
  });

  socket.on("send-message", (message, room) => {
    socket.to(room).emit("recieve-message", message);
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
  //const { totalAmount } = req.body;
  const totalAmount = 1400;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: (totalAmount*100)*83.24, //Current Indian Currency Rate
    currency: "inr",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});
//----------------------------------------------------------------------------------------------------------------------------------------------------
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
