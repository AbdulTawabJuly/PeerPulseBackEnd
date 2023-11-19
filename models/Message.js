const mongoose = require('mongoose');
const User=require('./User')

const messageSchema = new mongoose.Schema({
    type: {
        type:String,
        required:true,
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required:true
    },
    reciever: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required:true
    },
    content: {
        type:String,
        required:true
    }
})

const Message = mongoose.model('message',messageSchema);
module.exports = Message