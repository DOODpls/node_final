// const express = require('express');
// const pgroutr = express.Router();
// const blgschema = require('../models/blogschema');

// pgroutr.post('/newblog/sucess', function(request, response){
  
//   const usern = request.user.username
//   const title = request.body.title;
//   const dated = request.body.date;
//   const contnet = request.body.blogcont;

//   // var uniqueSlug = require('unique-slug')
//   // var randomSlug = uniqueSlug()
//   var slugify = require('slugify')
 
//   const months = ["JAN", "FEB", "MAR","APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
//   let current_datetime = new Date()
//   let formatted_date = current_datetime.getDate() + "-" + months[current_datetime.getMonth()] + "-" + current_datetime.getFullYear()

//   const newpost = new blgschema(
//     {
//       username: usern,
//       date: formatted_date,
//       title: title,
//       blog_cont: contnet,
//       slug: slugify(title)
//     }
//   );

//   newpost.save(function (err, newpost){
//     console.log('saved tp db')
//     response.render('sucess')
//   })
// })