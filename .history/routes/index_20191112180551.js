const express = require('express');
const pgroutr = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

pgroutr.get('/profile', ensureAuthenticated, (req, res) =>
  res.render('profile', {
    user: req.user
  })
);

module.exports = pgroutr;