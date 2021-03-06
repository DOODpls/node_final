const express = require('express');
const pgroutr = express.Router();
const pages = require('../pages');
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

pgroutr.get('/', forwardAuthenticated, (req, res) => 
res.render('index', pages.index));

pgroutr.get('/profile', ensureAuthenticated, (req, res) =>
  res.render('profile', {
    user: req.user,
    title: pages.profile.title,
    csslk: pages.profile.csslk
  })
);

pgroutr.get('/profile/newblog', ensureAuthenticated, (req, res) => 
res.render('blog', pages.index));

module.exports = pgroutr;