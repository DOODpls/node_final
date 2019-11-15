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
  if(blogpost==[]){
    res.render('notfound')
  }else{
    res.render('viewpost', {
    blog: blogpost[0]
  })
  }
  
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


pgroutr.post('/newblog/sucess', function(request, response){
  
  const usern = request.user.username
  const title = request.body.title;
  const contnet = request.body.blogcont;

  // var uniqueSlug = require('unique-slug')
  // var randomSlug = uniqueSlug()
  var slugify = require('slugify')
 
  const months = ["JAN", "FEB", "MAR","APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  let current_datetime = new Date()
  let formatted_date = current_datetime.getDate() + "-" + months[current_datetime.getMonth()] + "-" + current_datetime.getFullYear()

  const newpost = new blgschema(
    {
      username: usern,
      date: formatted_date,
      title: title,
      blog_cont: contnet,
      slug: slugify(title)
    }
  );

  newpost.save(function (err, newpost){
    console.log('saved tp db')
    response.render('sucess')
  })
})




module.exports = pgroutr;