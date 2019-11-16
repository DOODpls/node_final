const express = require('express');
const pgroutr = express.Router();
const Usrchma = require('../models/usrschema');
const pages = require('../pages');
const passport = require('passport')
const app = express();




pgroutr.post('/', (req, res, next) => { ////// Node.js With Passport Authentication | Full Project
  const emailog = req.body.email;
  var obj = {emaill: emailog}
  passport.authenticate('local', {
    successRedirect: '/profile', //i think if the email authenthicates, itll redirect to /profile
    failureRedirect: '/' //else itll just reload the page
  })(req, res, next);

})





module.exports = pgroutr;