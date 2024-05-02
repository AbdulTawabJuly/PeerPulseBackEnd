//create a get members function controller

const getMembers = async(req,res) => {
    const roomId = req.query.roomId;
    try {
        const room = await Room.findOne({ _id: roomId });
        if (!room) {
            return res.status(404).json({ error: 'Room not found' });
        }
        return res.status(200).json(room.members);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}