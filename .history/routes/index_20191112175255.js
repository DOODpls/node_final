const express = require('express');
const pgroutr = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

pgroutr.get('/profile', ensureAuthenticated, (req, res) =>
  res.render('profile', {
  })
);

module.exports = pgroutr;