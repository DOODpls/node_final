const express = require('express');
const pgroutr = express.Router();
const pages = require('../pages');
const blgschema = require('../models/blogschema');
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

pgroutr.get('/', forwardAuthenticated, (req, res) => 
res.render('index', pages.index));

pgroutr.get('/profile', ensureAuthenticated, async function(req, res){

  // const blogl = await blgschema.find({username: req.user.username});
  console.log(blogl)
  res.render('profile', {
    usrblg: req.user.username,
    user: req.user,
    title: pages.profile.title,
    csslk: pages.profile.csslk
  })
});

pgroutr.get('/profile/newblog', ensureAuthenticated, (req, res) => 
res.render('blog', pages.index));

module.exports = pgroutr;