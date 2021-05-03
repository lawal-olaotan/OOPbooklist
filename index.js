
const express = require ('express');
const ejs = require('express-ejs-layouts');
const app = express();
const mongoose = require('mongoose')
const PORT = process.env.PORT || 5505;

app.use(express.urlencoded({extended: true }))
app.use(express.json())



// set up database 
let mongoDB = 'mongodb://127.0.0.1/my_userBase'
mongoose.connect(mongoDB,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=> console.log('connected,,'))
.catch((err) => console.log(err));


// let db = mongoose.connection;

// db.on('error',console.error.bind(console,'MongoDB connection error'))



// serve statics
app.use("/assets", express.static(__dirname + "/assets"));


// EJS templating engine
app.use(ejs)
app.set('layout','./layout');
app.set('views','./views');
app.set("view engine" , "ejs");
app.use(require('./functions').useLocals);


// Routes 
app.use("/", require("./routes/index"));
app.use("/users",require("./routes/users"));
app.use("/dashboard",require("./routes/"));


app.listen(PORT,console.log(`Server listening at ${PORT}`));
