//room controller

const Room = require("../models/Room");
const createRoom = async (req, res) => {
  const RoomName = req.body.Room;
  console.log(RoomName);
  const user = req.body.currentUser;
  if (!RoomName) {
    res.status(404).json({ error: "You Crazy Son of a Gun! Enter a Name!" });
  }
  try {
    const TRoom = await Room.create({
      name: RoomName,
      createdBy: user,
      members: [],
      startingTime:Date.now(),
      isPublic:req.body.isPublic
    });
    console.log(TRoom);
    res.status(200).json(TRoom);
  } catch (err) {
    console.log({error:"Error Creating Room"});
  }
};

const SearchRoom = async (req, res) => {
  const Rooms = req.query.RoomName;
  console.log(Rooms);
  if(Rooms)
  {
  try {
    const searchResult = await Room.find( { name:{$regex:'.*'+Rooms+'.*'},isPublic:true} );  // this is LIKE command in SQL
    if (searchResult) {
      res.status(200).json(searchResult);
    } else {
      res.json({ NoResults: "No results found" });
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
}
else
{
    try{
    const searchResult = await Room.find({isPublic:true});
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

const DeleteExpiredRooms=async()=>{
  const currentTime = Date.now();

const oneHourAgo = new Date(currentTime - 1000 * 60 * 60);

   try{
    const response=await Room.deleteMany({startingTime:{$lt:oneHourAgo}});
   }
   catch(error){
    console.log(error);
   }
}
const JoinRoom=async(req,res)=>{
  const roomID=String(req.query.RoomID.id);
  const user=req.query.UserID;
  console.log(user);
  roomID.String
   try{
    const response=await Room.findOne({_id:roomID}); 
    const response2=await Room.updateOne({_id:roomID},{$push:{members:user}});
    const response3=await Room.updateOne({_id:roomID},{$inc:{noOfMembers:1}});
    if(response)
    {
      res.status(200).json(response);
    }
    else{
      res.status(404).json({error:"No Room found."});
    }
   }
   catch(err)
   {
      res.status(500).json({error:"Error Finding Room"}); 
   }
}

module.exports = { createRoom,SearchRoom,DeleteExpiredRooms,JoinRoom };
