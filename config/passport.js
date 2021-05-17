// user authentication mechanism using passport for user logining 
const LocalStrategy = require ('passport-local').Strategy;

// needed for password hashing since we are bringing password from the database
const bcryptjs = require ("bcryptjs");

// we need to fetch our users details from our database
const User = require('../models/user');
const Books = require('../models/book');


module.exports = function (passport){
// configure passport object
    passport.use(
        new LocalStrategy({usernameField : 'email'}, (email,password,done) => {

            // find user email  information from the database
            User.findOne({email:email})
            .then((user) => {
                if(!user){
                    return done(null,false, {message:'email is not registered'});
                }

                // matching password with database information
                bcryptjs.compare(password,user.password, (err,isMatch)=> {
                    if(err) throw err;
                    if(isMatch){
                        return done(null,user);
                    }else{
                        return done (null,false,{message:'Password incorrect'})
                    }
                })
            })
            .catch((err) => {console.log(err)})
        })

    )

    passport.serializeUser(function(user,done){
        done(null,user.id)
    });
    passport.deserializeUser(function(id,done){
        User.findById(id,function(err,user){
            done(err,user);
        });
    });
};