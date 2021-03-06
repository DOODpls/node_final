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
  if(blogpost.length == 0){
    res.render('notfound', pages.notfound)
  }else{
    res.render('viewpost', pages.notfound, {
    blog: blogpost[0],
  })
  }
  
});

pgroutr.get('/newblog', ensureAuthenticated, function(req, res){
  res.render('blog', pages.newblog);
});

pgroutr.get('/profile/:slug/deleted', ensureAuthenticated, async function(req, res){
  const deleted = await blgschema.find({slug: req.params.slug});
  blgschema.deleteOne({ _id: deleted[0]._id }, function (err) {
    if (err) return handleError(err);
    res.render('deleted', pages.deleted);
  });
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

  function slugify(string) {
  const a = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;'
  const b = 'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------'
  const p = new RegExp(a.split('').join('|'), 'g')

  return string.toString().toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, '') // Trim - from end of text
}
 
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
    response.render('sucess', pages.sucess)
  })
})




module.exports = pgroutr;