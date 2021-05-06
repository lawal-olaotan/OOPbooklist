const express = require ("express"),
    funs = require ('../functions'),
    router = express.Router();


    const bcryptjs = require ("bcryptjs");
    // getting user schema 
    const User = require("../models/user");
    const {initialElements} = funs;
    const passport = require('passport');
    const {forwardAuthenticated} = require ('../config/auth')


    
    
    // registeration route
    // this route renders the registeration form
    router.get("/register",forwardAuthenticated,(req,res) => {
        const elements = [...initialElements,"../assets/js/login.js","../assets/css/list.min.css","../assets/css/login.min.css" ];

        const meta = funs.meta({
            description: "",
            keywords:"top 10 best sellers, where to keep books",
        },req)
    
        res.render("signup",{
            title: "Book-Kepper™ | Register",
            meta,
            elements,
            path:funs.pathToTheRoot(req._parsedUrl.path),
        })

    });

  
    
    // this get the data from the form in the client side
    router.post('/register', (req,res) => {
        const userdata = req.body;

       if(!userdata.UserName || !userdata.email  || !userdata.password ){
                res.json({status:"inputerror"});
       }

       const re = new RegExp("^(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");
       if(!re.test(userdata.password)){
                res.json({status:"inputerror"});
       }


           User.findOne({email: userdata.email})
           .then((user)=>{
                if(user){

                 res.json({status:"exists"});
                   
                }else{
                    const newUser = new User(userdata);

                    // encrypting password 
                    bcryptjs.genSalt(10,(err,salt) => {
                        bcryptjs.hash(newUser.password,salt, (err,hash)=>{
                            if(err) throw err; 
                            newUser.password = hash;
                            newUser.save()
                            .then( user => {
                                req.flash('success_msg','You have now registered!');
                                res.status(200).json({status:"successful"});             
                            })
                            .catch(err => console.log(err));
                        })
                    })
              
                }

           });

       
    });



    // rendering login page with ejs and it's own custom javascript file
    router.get("/login",forwardAuthenticated,(req,res) => {

        const elements = [...initialElements,"../assets/js/signin.js","../assets/css/list.min.css","../assets/css/login.min.css" ];

        const meta = funs.meta({
            description: "",
            keywords:"top 10 best sellers, where to keep books",
        },req)
    
        res.render("login",{
            title: "Book-Kepper™ | Login",
            meta,
            elements,
            path:funs.pathToTheRoot(req._parsedUrl.path),
        })

    });


    router.post("/login",(req,res,next) => {
        passport.authenticate ('local', {
            successRedirect:'/dashboard',
            failureRedirect:'/users/login',
            failureFlash:true,
        })(req,res,next)
    })


    

    module.exports = router;
