
const express = require ('express');
const ejs = require('express-ejs-layouts');
const app = express();
const PORT = process.env.PORT || 5505;

app.use(express.urlencoded({extended: true }))
app.use(express.json())


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
app.use("/dashboard",require("./routes/"));


app.listen(PORT,console.log(`Server listening at ${PORT}`));
