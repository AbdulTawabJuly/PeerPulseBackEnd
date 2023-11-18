const Users = require("../models/User");
const Messages = require("../models/Message");

const sendFriendReq = async (req,res) => {
    const userUsername = req.query.user_username;
    const friendUsername = req.query.friend_username;
    
    try {
       
        const user = await Users.findOne({ username: userUsername });
        const friend = await Users.findOne({ username: friendUsername }).populate('messages');
    
        if (!user || !friend) {
          console.log("user not found")
          return res.status(404).json({ error: 'User not found' });
        }
    
        
        // if (user.friends.includes(friend._id)) {
        //   console.log("friend already added");
        //   return res.status(400).json({ error: 'Friend already added' });
        // }

        console.log('user.messages: ',friend.messages);

        if (friend.messages && friend.messages.find(message => message.sender && message.sender._id.toString() === user._id.toString())) {
          return res.status(400).json({ error: 'Friend request already sent' });
        }

        const content = `${user.name} sent you a friend request`;
        const response = await Messages.create({sender:user._id, reciever: friend._id, content: content, type:'notification'});
        friend.messages.push(response._id);
        friend.save();
        
    
        res.json({ message: 'Friend request sent'});
        console.log("friend req sent");
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}

const addFriend = async(req,res) => {
  const userUsername = req.query.user_username;
  const friendUsername = req.query.friend_username;
  
  try {
     
      const user = await Users.findOne({ username: userUsername });
      const friend = await Users.findOne({ username: friendUsername });
  
      if (!user || !friend) {
        return res.status(404).json({ error: 'User or friend not found' });
      }
  
      if (user.friends.includes(friend._id)) {
        return res.status(400).json({ error: 'Friend already added' });
      }
      
      user.friends.push(friend._id);
      await user.save();
      friend.friends.push(user._id);
      await friend.save();
      res.json({ message: 'Friend added successfully', user, friend });

    }
    catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
}

const getNotifications = async(req,res) => { 
  const username = req.query.username;
  try {
    const user = await Users.findOne({ username }).populate('messages');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.status(200).json(user);
  }
  catch(error) {
    return res.status(500).json({error: "error occuredddd"});
  }
}

const declineReq = async (req,res) => {

}

const removeFriend = async (req,res) => {

}

const blockFriend = async (req,res) => {

}

module.exports = {sendFriendReq, addFriend, declineReq, removeFriend, blockFriend, getNotifications};