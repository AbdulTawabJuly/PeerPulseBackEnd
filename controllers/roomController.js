//room controller
const { sendMail, invoiceTemplate,tokenGenerator } = require("../Extras/common");

const Room = require("../models/Room");
const createRoom = async (req, res) => {
  const RoomName = req.body.Room;
  const user = req.body.currentUser;
  if (!RoomName) {
    res.status(404).json({ error: "You Crazy Son of a Gun! Enter a Name!" });
  }
  try {
    const TRoom = await Room.create({
      name: RoomName,
      createdBy: user,
      members: [],
      startingTime: Date.now(),
      isPublic: req.body.isPublic,
      isPaid: req.body.isPaid,
      price: req.body.price,
    });
    res.status(200).json(TRoom);
  } catch (err) {
    console.log({ error: "Error Creating Room" });
  }
};

const SearchRoom = async (req, res) => {
  const Rooms = req.query.RoomName;
  if (Rooms) {
    try {
      const searchResult = await Room.find({
        name: { $regex: ".*" + Rooms + ".*" },
        isPublic: true,
      }); // this is LIKE command in SQL
      if (searchResult) {
        res.status(200).json(searchResult);
      } else {
        res.json({ NoResults: "No results found" });
      }
    } catch (err) {
      res.status(500).json({ error: err });
    }
  } else {
    try {
      const searchResult = await Room.find({ isPublic: true });
      if (searchResult) {
        res.status(200).json(searchResult);
      } else {
        res.json({ NoResults: "No results found" });
      }
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }
};

const DeleteExpiredRooms = async () => {
  const currentTime = Date.now();

  const oneHourAgo = new Date(currentTime - 1000 * 60 * 60);

  try {
    const response = await Room.deleteMany({
      startingTime: { $lt: oneHourAgo },
    });
  } catch (error) {
    console.log(error);
  }
};
const JoinRoom = async (req, res) => {
  const roomID = String(req.query.RoomID.id);
  const user = req.query.UserID;

  try {
    const response = await Room.findOne({ members: user });
    var response1, response2, response3;
    if (!response) {
      response2 = await Room.updateOne(
        { _id: roomID },
        { $push: { members: user } }
      );
      response3 = await Room.updateOne(
        { _id: roomID },
        { $inc: { noOfMembers: 1 } }
      );
    }
    response1 = await Room.findOne({ _id: roomID }).populate(
      "members",
      "_id email"
    );
    if (response1) {
      res.status(200).json(response1);
    } else {
      res.status(404).json({ error: "No Room found." });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error Finding Room" });
  }
};
const LeaveRoom = async (req, res) => {
  const Roomid = String(req.query.RoomID.id);
  const user = String(req.query.currentUser);
  try {
    const response = await Room.findOne({ members: user });
    var response1, response2;
    if (response) {
      response1 = await Room.updateOne(
        { _id: Roomid },
        { $pull: { members: user } }
      );
      response2 = await Room.updateOne(
        { _id: Roomid },
        { $inc: { noOfMembers: -1 } }
      );
    }
    if (response1 && response2) {
      res.status(200).json({ success: "All OK!" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error Leaving Room" });
  }
};

const getRoom = async (req, res) => {
  const Roomid = String(req.query.roomID);
  try {
    const response = await Room.findOne({ _id: Roomid }).populate(
      "members",
      "_id email"
    );
    if (response) {
      res.status(200).json(response);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "could not get room" });
  }
  return res.status(200);
};

const sendInvoice = async (req, res) => {
  const { name, price } = req.body.RoomDetails;
  const email = req.body.user.user.email;
  const id = req.body.params.id;
  const subject = "Payment Invoice";
  const text =
    "Your Payment for Room: " + name + " of " + price + " has been recieved.";
  if (email) {
    const response = await sendMail({
      to: email,
      subject,
      text,
      html: invoiceTemplate(id, name, price),
    });
  } else {
    res.sendStatus(400);
  }
};

const generateToken = async (req, res) => {
  const response = await tokenGenerator();
  console.log(response);
  res.json(response);
};

module.exports = {
  createRoom,
  SearchRoom,
  DeleteExpiredRooms,
  JoinRoom,
  LeaveRoom,
  getRoom,
  sendInvoice,
  generateToken,
};
