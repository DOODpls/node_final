const express = require('express');
const pgroutr = express.Router();
const pages = require('../pages');
const blgschema = require('../models/blogschema');
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

pgroutr.get('/', forwardAuthenticated, (req, res) => 
res.render('index', pages.index));

pgroutr.get('/profile', ensureAuthenticated, async function(req, res){

  const blogl = await blgschema.find({username: req.user.username});
  res.render('profile', {
    usrblg: blogl,
    user: req.user,
    title: pages.profile.title,
    csslk: pages.profile.csslk
  })
});

pgroutr.get('/profile/blog/:slug', ensureAuthenticated, function(req, res){
  const blogpost = blgschema.findOne({slug: req.params.slug});
  console.log(blogpost.username)
  res.render('viewpost', {
    blog: blogpost
  })
});

pgroutr.get('/profile/newblog', ensureAuthenticated, function(req, res){
  res.render('blog', pages.newblog);
});




module.exports = pgroutr;