const express = require ("express"),
    funs = require ('../functions'),
    router = express.Router();

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
        const userdata = req.body
        console.log(userdata);
        res.status(200).json({status:'successful'})
    })
    

    module.exports = router;
