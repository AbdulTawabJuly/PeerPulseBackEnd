//room controller

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
      members: [user],
      startingTime:Date.now(),
      isPublic:req.body.isPublic
    });
    res.status(200).json({Success:"Room Created Successfully!"});
  } catch (err) {
    console.log(err);
  }
};

const SearchRoom = async (req, res) => {
  const Rooms = req.query.RoomName;
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
const SearchRoomByID=async(req,res)=>{
  const roomID=String(req.query.RoomID.id);
  roomID.String
   try{
    const response=await Room.findOne({_id:roomID}); 
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
      res.status(404).json({error:"Error Finding Room"}); 
   }
}

module.exports = { createRoom,SearchRoom,DeleteExpiredRooms,SearchRoomByID };
