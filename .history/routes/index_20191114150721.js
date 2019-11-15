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

pgroutr.get('/profile/:slug', ensureAuthenticated, async function(req, res, err){
  const blogpost = await blgschema.find({slug: req.params.slug});
  res.render('viewpost', {
    blog: blogpost[0]
  })
});

pgroutr.get('/newblog', ensureAuthenticated, function(req, res){
  res.render('blog', pages.newblog);
});

pgroutr.get('/profile', ensureAuthenticated, async function(req, res){
  const blogpost = await blgschema.find({slug: req.params.slug});
  console.log(blogpost[0].title)
  res.render('viewpost', {
    blog: blogpost[0]
  })
});


module.exports = pgroutr;