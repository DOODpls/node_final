const bcrypt = require('bcrypt')
const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');

const User = require('../models/usrschema')

module.exports = function(passport){
  passport.use(
    new localStrategy({ usernameField: 'email'}, ( email, password, done) =>  {
      User.findOne({email: email})
      .then(user => {
        if(!user){
          return done(null, false, {});
        }

        bcrypt.compare(password, user.password, (err, isMatch) => { //it compares the hashed password from database
          if(err) throw err;
          if(isMatch){
            return done(null, user);
          } else {
            return done(null, false);
          }
        });

      })
      .catch(err => console.log(err))
    })
  );
  
  passport.serializeUser ((user, done) => {
    done(null, user.id)
  });

  passport.deserializeUser ((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user)
    })
  })

}