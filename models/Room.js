const mongoose = require('mongoose');
const User=require('./User')
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
        
        type:mongoose.Schema.Types.ObjectId,
        ref:User
    }],
    createdBy:String, 
    isPublic:Boolean,
    isPaid:Boolean,
    price:{ type: Number },
    bannedUsers:[{
        type:String,
    }]

});

const Room = mongoose.model('room',roomSchema);
module.exports = Room;
