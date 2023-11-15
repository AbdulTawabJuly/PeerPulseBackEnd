const Users = require("../models/User");
const Messages = require("../models/Message");

const sendFriendReq = async (req,res) => {
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
        const content = `${user.name} sent you a friend request`;
        const response = await Messages.create({sender:user._id, reciever: friend._id, content: content, type:'notification'});
        friend.notifications.push(response._id);
        friend.save();
        
    
        res.json({ message: 'Friend request sent', response });
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
      
      if (user.notifications && user.notifications.find(notification => notification.sender && notification.sender._id === friend._id)) {
        return res.status(400).json({ error: 'Friend request already sent' });
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

module.exports = {sendFriendReq, addFriend};