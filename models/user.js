const mongoose = require('mongoose'),

UserSchema = new mongoose.Schema({
    
    UserName:{
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true  
    },
    password: {
        type:String,
        required:true 
    },
    date: {
        type:Date,
        default:Date.now
    },

}),

User = mongoose.model('User', UserSchema);

module.exports = User;