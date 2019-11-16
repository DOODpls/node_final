const express = require('express');
const pgroutr = express.Router();
const Usrchma = require('../models/usrschema');
const pages = require('../pages');
const passport = require('passport')
// const bcrypt = require('bcrypt')
// const localStrategy = require('passport-local').Strategy;
const app = express();


// pgroutr.post('/', function(request, response){
//   const emailog = request.body.email;
//   const passwlog = request.body.password;
//   const loginuser = new Usrchma(
//     {
//       email: emailog,
//       password: passwlog,
//       status: 'online'
//     }
//   );
//   var self = this;
//   var obj = {emaill: emailog}

//   Usrchma.find({'email': emailog, 'password': passwlog}, function (err, docs) {
    
//     if(!docs.length){
//     response.render('error', pages.error);
//     }else if (emailog == docs[0].email && passwlog == docs[0].password){
//       console.log('user exists: ',self.email);
//       response.render("profile", obj)
//     }else{                
//       console.log('account not found')
//     }
// });
// })


pgroutr.post('/', (req, res, next) => { ////// Node.js With Passport Authentication | Full Project
  const emailog = req.body.email;
  var obj = {emaill: emailog}
  passport.authenticate('local', {
    successRedirect: '/profile', //i think if the email authenthicates, itll redirect to /profile
    failureRedirect: '/' //else itll just reload the page
  })(req, res, next);

})





module.exports = pgroutr;