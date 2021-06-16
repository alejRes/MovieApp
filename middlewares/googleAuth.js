const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const UserSchema = require("../models/user");
require('dotenv').config();
const findOrCreate = require('mongoose-find-or-create')






UserSchema.plugin(findOrCreate);

passport.use(new GoogleStrategy({
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: "/auth/google/redirect"
        },
            (accessToken,refreshToken,profile,done) => {
            console.log("access token: ", accessToken);
            // passport callback function
            //check if user already exists in our db with the given profile ID
            User.findOne({googleId: profile.id}).then((currentUser)=>{
            if(currentUser){
            //if we already have a record with the given profile ID
            done(null, currentUser);
            } else{
             //if not, create a new user 
            new User({
              googleId: profile.id,
            }).save().then((newUser) =>{
              done(null, newUser);
            });
         } 
      })

          }

    ));

    passport.serializeUser((user, done) => {
        done(null, user.id);
      });

      passport.deserializeUser((id, done) => {
        User.findById(id).then(user => {
          done(null, user);
        });
      });