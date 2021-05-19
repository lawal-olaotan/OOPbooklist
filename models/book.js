
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
    },
    recom: {
        type:String,
        required:true,
    },
    images: {
        type:String,
        required:true,
    },
    rating: {
        type:String,
        required:true,
    },
    descrip: {
        type:String,
        required:true,
    },
    user: {
        type:mongoose.Schema.ObjectId,
         ref: 'User',
         required: true,
    }

}),



Books = mongoose.model('Books', BookSchema);

module.exports = Books;