const express = require('express');
const pgroutr = express.Router();
const pages = require('../pages');
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

pgroutr.get('/', forwardAuthenticated, (req, res) => 
res.render('index', pages.index));

pgroutr.get('/profile', ensureAuthenticated, (req, res) =>
  res.render('profile', pages.profile{
    user: req.user
  })
);

module.exports = pgroutr;