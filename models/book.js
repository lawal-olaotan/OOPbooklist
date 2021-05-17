
const mongoose = require('mongoose'),


BookSchema = new mongoose.Schema({
    
    title:{
        type:String,
        required:true
    },
    author: {
        type:String,
        required:true  
    },
    review: {
        type:String,
        required:true
    },
    buylink: {
        type:String,
    },
    user: {
        type:mongoose.Schema.ObjectId,
         ref: 'User',
         required: true,
        }

}),



Books = mongoose.model('Books', BookSchema);

module.exports = Books;