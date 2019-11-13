const express = require('express');
const pgroutr = express.Router();
const blgschema = require('../models/blogschema');


pgroutr.post('/profile', function(req, res){

  const usr = request.body.userna;
  const blgtt = request.body.blogtitle;
  const dtToday = request.body.dateToday;
  const blgcont = request.body.blogcontent;

  const newbPost = new blgschema(
    {
      username: usr,
      date: dtToday,
      title: blgtt,
      blog_cont: blgcont
    }
  );

  newbPost.save(function (err, newbPost){
    if (err) return response.render('error', pages.error);
    console.log('document added to collection')
    res.redirect('/profile')
  })
});

module.exports = pgroutr;