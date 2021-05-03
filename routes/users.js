const express = require ("express"),
    funs = require ('../functions'),
    router = express.Router();

    // getting user schema 
    const User = require("../models/user");

    const {initialElements} = funs;
    
    // registeration route
    // this route renders the registeration form
    router.get("/signup",(req,res) => {

        const elements = [...initialElements,"../assets/js/login.js","../assets/css/list.min.css","../assets/css/login.min.css" ];
    
        const meta = funs.meta({
            description: "",
            keywords:"top 10 best sellers, where to keep books",
        },req)
    
        res.render("signup",{
            title: "Book-keeper™ | regsiter",
            meta,
            elements,
            path:funs.pathToTheRoot(req._parsedUrl.path),
    
        })
    });


    // this get the data from the form in the client side
    router.post('/register', (req,res)=> {

        const userdata = req.body;
        let errors = [];

       if(!userdata.UserName || !userdata.email  || !userdata.password ){
            errors.push({msg:"Please fill an fields"});
            console.log('error')
       }

       const re = new RegExp("^(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");
       if(!re.test(userdata.password)){
           errors.push({msg:'Password must contain a capital letter and a number'})
       }

       if(errors.length > 0){
           res.render('signup', {
            errors:errors, 
            name: userdata.UserName,
            email : userdata.email,
            password :userdata.password,
           });
       } else{

           User.findOne({email:userdata.email}).exec((err,user)=>{

                if(user){
                    errors.push({msg:'email already registered'});

                    res.render('signup', {
                        errors:errors, 
                        name: userdata.UserName,
                        email : userdata.email,
                        password :userdata.password,  
                    });
                }else{
                    const newUser = new User(userdata);
                    console.log(NewUser);
                    

                    


                }

           });

       }

       res.status(200).json({status:"successful"});
    });
    

    module.exports = router;
