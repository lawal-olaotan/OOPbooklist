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

// BookSchema = new mongoose.Schema({
    
//     booktitle:{
//         type:String,
//         required:true
//     },
//     author: {
//         type:String,
//         required:true  
//     },
//     description: {
//         type:String,
//         required:true 
//     },
//     reviews: {
//         type:String,
//         required:true
//     },
//     buylink: {
//         type:String,
//         required:true
//     },
//     user: {type:mongoose.Schema.ObjectId, ref: 'User'},

// }),



User = mongoose.model('User', UserSchema);
// Books = mongoose.model('Books', BookSchema);

module.exports = User;
// module.exports = Books;