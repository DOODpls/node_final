const mongoose = require('mongoose');
require('dotenv').config()
const pages = require('./pages');
const express = require('express');
const path = require('path');
const flash = require('connect-flash')
const session = require('express-session')
const regroutr = require('./routes/regRoutes');
const logroutr = require('./routes/logRoutes');
const passport = require('passport');
const app = express();

require('./config/passport')(passport);

mongoose.connect(process.env.DB_CONNECTION, { useUnifiedTopology: true,useNewUrlParser: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('DB Connected!!!');
});


app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }))

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use('/', require('./routes/index.js'));
app.use('/profile/newblog', require('./routes/index.js'));
app.use('/profile/blog/:slug', require('./routes/index.js'));
app.use('/registered', regroutr);
// regroutr.get('/profile', (req, res) => res.render('profile'));
app.use('/profile', logroutr);

const blgschema = require('./models/blogschema');

app.post('/newblog/sucess', function(request, response){
  
  const usern = request.user.username
  const title = request.body.title;
  const dated = request.body.date;
  const contnet = request.body.blogcont;

  // var uniqueSlug = require('unique-slug')
  // var randomSlug = uniqueSlug()
  var slugify = require('slugify')
 
  let current_datetime = new Date()
  let formatted_date = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate() + " " + current_datetime.getHours() + ":" + current_datetime.getMinutes();

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

app.use(express.static(path.join(__dirname, 'public')));

app.use(function (err, response) {
  console.error(err.body)
  response.status(404).render('notfound', pages.notfound);
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, function(){
  console.log(`Listening on PORT ${PORT}`)
})