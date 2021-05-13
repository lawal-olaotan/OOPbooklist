
const mongoose = require('mongoose'),


BookSchema = new mongoose.Schema({
    
    booktitle:{
        type:String,
        required:true
    },
    author: {
        type:String,
        required:true  
    },
    description: {
        type:String,
        required:true 
    },
    reviews: {
        type:String,
        required:true
    },
    buylink: {
        type:String,
        required:true
    },
    user: {type:mongoose.Schema.ObjectId, ref: 'User'},

}),



Books = mongoose.model('Books', BookSchema);

module.exports = Books;