const express = require ("express"),
    funs = require ('../functions'),
    router = express.Router();

    const Books = require("../models/user")

// global variables
const {initialElements} = funs;

const bcryptjs = require ("bcryptjs");
// getting user schema 
const User = require("../models/user");


const {ensureAuthenicated} = require ("../config/auth");

router.post("/mybooks", (req,res)=> {
    const books = req.body;
    books.user = req.user.UserName;
    console.log(books);
    res.status(200).json({status:"successful"});
    
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

        res.render('dashboard/'+ books, {
            elements,
            meta,
            user:req.user,
            active: books,
            title: "Book-keeper™ | dashboard",
            path:funs.pathToTheRoot(req._parsedUrl.path),
        });
});



  

module.exports = router;