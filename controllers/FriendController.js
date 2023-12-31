const Users = require("../models/User");
const Message = require("../models/Message");

const sendFriendReq = async (req, res) => {
  const userUsername = req.query.user_username;
  const friendUsername = req.query.friend_username;

  try {

    const user = await Users.findOne({ username: userUsername }).populate('friends', 'messages');
    const friend = await Users.findOne({ username: friendUsername }).populate('messages');

    if (!user || !friend) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.friends && user.friends.find(friend2 => friend2._id.toString() === friend._id.toString())) {
      return res.status(400).json({ error: 'Friend already added' });
    }

    if (friend.messages && friend.messages.find(message => message.sender && message.sender._id.toString() === user._id.toString())) {
      return res.status(400).json({ error: 'Friend request already sent' });
    }

    const content = `${user.name} sent you a friend request`;
    const response = await Message.create({ sender: user._id, reciever: friend._id, content: content, type: 'notification' });
    friend.messages.push(response._id);
    friend.save();


    res.json({ message: 'Friend request sent' });
    console.log("friend req sent");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

const addFriend = async (req, res) => {
  const userUsername = req.query.user_username;
  const friendUsername = req.query.friend_username;
  const notificationID = req.query.notificationID;

  try {

    const user = await Users.findOne({ username: userUsername });
    const friend = await Users.findOne({ username: friendUsername });

    if (!user || !friend) {
      return res.status(404).json({ error: 'User or friend not found' });
    }

    if (user.friends && user.friends.find(friend2 => friend2._id.toString() === friend._id.toString())) {
      return res.status(400).json({ error: 'Friend already added' });
    }

    user.friends.push(friend._id);
    await user.save();
    friend.friends.push(user._id);
    await friend.save();

    const response = await Message.findOneAndDelete({_id: notificationID});
    return res.json({ message: 'Friend request accepted' });

  }
  catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

const getNotifications = async (req, res) => {
  const username = req.query.username;
  try {
    const user = await Users.findOne({ username }).populate({
      path: 'messages',
      populate: [
        {
          path: 'sender',
          model: 'user',
          select: 'username'
        },
        {
          path: 'reciever',
          model: 'user',
          select: 'username'
        }
      ]
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.status(200).json(user);
  }
  catch (error) {
    console.log(error)
    return res.status(500).json({ error: "error occuredddd" });
  }
}

const declineReq = async (req, res) => {
  const userUsername = req.query.user_username;
  const friendUsername = req.query.friend_username;
  const notificationID = req.query.notificationID;

  try {

    const user = await Users.findOne({ username:userUsername }).populate({
      path: 'messages',
      populate: {
        path: 'sender reciever',
        model: 'user',
        select: 'name username email'
      }
    });
    const friend = await Users.findOne({ username: friendUsername });

    if (!user || !friend) {
      return res.status(404).json({ error: 'User or friend not found' });
    }

    if (user.messages && user.messages.find(message => message.sender && message.sender._id.toString() === friend._id.toString() && message.type === 'notification')) {
      const response = await Message.findOneAndDelete({_id: notificationID});
      return res.status(200).json({message: 'Friend Request declined'});
    }

    return res.status(400).json({ error: 'No such notification exists' });

  }
  catch(error) {
    return res.status(500).json({error: 'internal server error'});
  }

}

const removeFriend = async (req, res) => {
  const userUsername = req.query.user_username;
  const friendUsername = req.query.friend_username;

  try {
    const user = await Users.findOne({ username: userUsername });
    const friend = await Users.findOne({ username: friendUsername });
    if (!user || !friend) {
      return res.status(404).json({ error: 'User or friend not found' });
    }

    const userIndex = user.friends.findIndex(friendId => friendId.toString() === friend._id.toString());
    const friendIndex = friend.friends.findIndex(userId => userId.toString() === user._id.toString());

    if (userIndex === -1 || friendIndex === -1) {
      return res.status(400).json({ error: 'Friend not found in the friend list' });
    }

    user.friends.splice(userIndex, 1);
    await user.save();

    friend.friends.splice(friendIndex, 1);
    await friend.save();
    console.log("friend removed successfully")

    return res.json({ message: 'Friend removed successfully' });

  }
  catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }

}
const blockFriend = async (req, res) => {
  const userUsername = req.query.user_username;
  const friendUsername = req.query.friend_username;

  try {
    const user = await Users.findOne({ username: userUsername });
    const friend = await Users.findOne({ username: friendUsername });

    if (!user || !friend) {
      return res.status(404).json({ error: 'User or friend not found' });
    }

    // Check if the friend is already blocked
    if (user.blockedFriends && user.blockedFriends.includes(friend._id.toString())) {
      return res.status(400).json({ error: 'Friend is already blocked' });
    }

    // Add friend to the blockedFriends list
    user.blockedFriends = user.blockedFriends || [];
    user.blockedFriends.push(friend._id);
    await user.save();

    return res.json({ message: 'Friend blocked successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

const getFriends = async(req,res) => {
  const userUsername = req.query.user_username;
  try {
    const user = await Users.findOne({ username: userUsername }).select('-password -resetPasswordToken').populate({
      path:'friends',
      select: '-password -resetPasswordToken'
    })
    if(!user) {
      return res.status(400).json({error: 'User does not exist'});
    } 
    return res.status(200).json({friends: user.friends});
  } 
  catch(error) {
    return res.status(500).json({error: "internal server error"})
  }

}

const unBlock = async(req,res)=> {
  const userUsername = req.query.user_username;
  const friendUsername = req.query.friend_username;

  try {
    const user = await Users.findOne({ username: userUsername });
    const friend = await Users.findOne({ username: friendUsername });

    if (!user || !friend) {
      return res.status(404).json({ error: 'User or friend not found' });
    }

    // Check if the friend is in the blockedFriends list
    const friendIndex = user.blockedFriends.findIndex(blockedFriendId => blockedFriendId.toString() === friend._id.toString());

    if (friendIndex === -1) {
      return res.status(400).json({ error: 'Friend is not blocked' });
    }

    // Remove friend from the blockedFriends list
    user.blockedFriends.splice(friendIndex, 1);
    await user.save();

    return res.json({ message: 'Friend unblocked successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = { sendFriendReq, addFriend, declineReq, removeFriend, blockFriend, getNotifications, getFriends, unBlock };