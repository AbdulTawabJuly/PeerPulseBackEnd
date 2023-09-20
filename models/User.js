const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true,
        unique:true
    },
    password: {
        type:String,
        required:true
    },
    friends: [{type:mongoose.Schema.Types.ObjectId, ref:'User'}],
    interest:[string]
})

const User =  mongoose.model('user',userSchema);
module.exports = User;