const Room = require('../models/Room');

const getMembers = async (req, res) => {
    const roomId = req.query.roomId;

    if (!roomId) {
        return res.status(400).json({ error: 'Room ID must be provided' });
    }

    try {
        // Fetch the room by ID and populate the whiteboardMembers array with the name field
        const room = await Room.findById(roomId).populate('whiteboardMembers', 'name');
        if (!room) {
            return res.status(404).json({ error: 'Room not found' });
        }

        // Extract the initials of the names of the whiteboard members
        const whiteboardMemberInitials = room.whiteboardMembers.map(member => {
            const names = member.name.split(' ');
            let initials = names.map(name => name[0].toUpperCase()).join('');
            return initials;
        });

        // Return the initials of the whiteboard members
        return res.status(200).json(whiteboardMemberInitials);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const addMember = async (req, res) => {
    const { roomId, memberId } = req.body;

    if (!roomId || !memberId) {
        return res.status(400).json({ error: 'Room ID and Member ID must be provided' });
    }

    try {
        const room = await Room.findById(roomId);
        if (!room) {
            return res.status(404).json({ error: 'Room not found' });
        }

        // Check if the member is already a whiteboard member
        if (room.whiteboardMembers.includes(memberId)) {
            return res.status(400).json({ error: 'Member already in whiteboard' });
        }

        // Add member to whiteboardMembers array
        room.whiteboardMembers.push(memberId);
        await room.save();

        res.status(200).json({ message: 'Member added to whiteboard successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const removeMember = async (req, res) => {
    const { roomId, memberId } = req.body;

    if (!roomId || !memberId) {
        return res.status(400).json({ error: 'Room ID and Member ID must be provided' });
    }

    try {
        const room = await Room.findById(roomId);
        if (!room) {
            return res.status(404).json({ error: 'Room not found' });
        }

        // Remove member from whiteboardMembers array
        room.whiteboardMembers = room.whiteboardMembers.filter(id => id.toString() !== memberId);
        await room.save();

        res.status(200).json({ message: 'Member removed from whiteboard successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = { getMembers, addMember, removeMember };
