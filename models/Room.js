const mongoose = require('mongoose');

const roomSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Are you crazy?"]
    },
    startingTime:{
        type: Date,
    },
    noOfMembers:{
        type:Number,
        default:0
    },
    members:[{
        type:String
    }],
    createdBy:String, 
    isPublic:Boolean,
    isPaid:Boolean

});

const Room = mongoose.model('room',roomSchema);
module.exports = Room;
