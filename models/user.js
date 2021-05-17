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
    books:[{
        type:mongoose.Schema.ObjectId,
        ref: 'Books',
    }]

}),





User = mongoose.model('User', UserSchema);
// Books = mongoose.model('Books', BookSchema);

module.exports = User;
// module.exports = Books;