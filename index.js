
const express = require ('express');
const ejs = require('express-ejs-layouts');
const mongoose = require('mongoose')
const PORT = process.env.PORT || 5505;
const flash = require('connect-flash');
const session = require ('express-session');

const passport = require ('passport');

// passport comfig 
require("./config/passport")(passport)

const app = express();



// express body parser
app.use(express.urlencoded({extended: true }))
app.use(express.json())

const db = require('./config/keys').mongoURI;



// // set up database 
// let mongoDB = 'mongodb://127.0.0.1/my_userBase'

mongoose.connect(db,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=> console.log('connected,,'))
.catch((err) => console.log(err));


// let db = mongoose.connection;
// db.on('error',console.error.bind(console,'MongoDB connection error'))


// serve statics
app.use("/assets", express.static(__dirname + "/assets"));


app.use(session({
    secret:'secret',
    resave:true,
    saveUninitialized:true,
}));

// passport middleware
app.use(passport.initialize());
app.use(passport.session());



// connecting flash 
app.use(flash());


// global variables
app.use((req,res,next)=> {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();

});


// EJS templating engine
app.use(ejs)
app.set('layout','./layout');
app.set('views','./views');
app.set("view engine" , "ejs");
app.use(require('./functions').useLocals);


// Routes 
app.use("/", require("./routes/index"));
app.use("/users",require("./routes/users"));
// app.use("/dashboard",require("./routes/"));


app.listen(PORT,console.log(`Server listening at ${PORT}`));
