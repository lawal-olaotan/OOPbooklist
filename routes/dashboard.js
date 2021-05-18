const express = require ("express"),
    funs = require ('../functions'),
    router = express.Router();

// Books schema 
const Book = require("../models/book");

// global variables
const {initialElements} = funs;

const bcryptjs = require ("bcryptjs");
// getting user schema 
const User = require("../models/user");

const {ensureAuthenicated} = require ("../config/auth");


router.post("/mybooks", (req, res)=> {

        const book = new Book(req.body);
        book.user = req.user._id;
        book.save();
    
        User.findById({_id: book.user})
       .then( user => {
        user.books.push(book);
        user.save();
       console.log(user);
        res.status(200).json({status:"successful"});

       }).catch(err => console.error(err));

})







router.get("/main/:id",ensureAuthenicated,(req,res)=> {

    let adminName = req.params.id.replace('@','');
    const elements = [...initialElements,"../assets/js/dashboard.js","../assets/css/list.min.css","../assets/css/login.min.css"]
});


router.get("/",ensureAuthenicated,(req,res)=> {

    // assets the route
    const elements = [...initialElements,"../assets/js/dashboard.js","../assets/css/dash.min.css"];

    // defining the book tab menu
    let books = 'books';

    // route meta tag 
    const meta = funs.meta({
        description: "",
        keywords:"top 10 best sellers, where to keep books",
    },req)

    res.render('dashboard/'+ books, {
        elements,
        meta,
        books:req.book,
        user:req.user,
        active: books,
        title: "Book-keeper™ | dashboard",
        path:funs.pathToTheRoot(req._parsedUrl.path),
    });
});


router.get("/:books",ensureAuthenicated,(req,res) => {
    
        const elements = [...initialElements,"../assets/js/dashboard.js","../assets/css/dash.min.css"];
        let books = req.params.books === '' ? 'books':req.params.books


        const meta = funs.meta({
            description: "",
            keywords:"top 10 best sellers, where to keep books",
        },req)

        Book.find({},function(err,data){
            
        res.render('dashboard/'+ books, {
            elements,
            meta,
            user:req.user,
            bookdata:data,
            active: books,
            title: "Book-keeper™ | dashboard",
            path:funs.pathToTheRoot(req._parsedUrl.path),
        });

    });  
});



  

module.exports = router;