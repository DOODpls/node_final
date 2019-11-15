const express = require('express');
const pgroutr = express.Router();
const blgschema = require('../models/blogschema');

const blgschema = require('./models/blogschema');

app.post('/sucess', function(request, response){
  
  const usern = 'sdfsdfds'
  const title = request.body.title;
  const dated = request.body.date;
  const contnet = request.body.blogcont;

  const newpost = new blgschema(
    {
      username: usern,
      date: dated,
      title: title,
      blog_cont: contnet 
    }
  );

  newpost.save(function (err, newpost){
    console.log('saved tp db')
    response.render('sucess')
  })
})

module.exports = pgroutr;