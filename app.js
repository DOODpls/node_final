const mongoose = require('mongoose');
require('dotenv').config()
const pages = require('./pages');
const express = require('express');
const path = require('path');
const pgroutr = require('./routes/webRoutes');

const app = express();
mongoose.connect(process.env.DB_CONNECTION, { useUnifiedTopology: true,useNewUrlParser: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('DB Connected!!!');
});


app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }))


app.get('/', function(request, response){
  response.render('index', pages.index)
})
// app.get('/alreadyssubbed', function(request, response){
//   response.render('alreadysub', pages.alreadysub)
// })
// app.get('/error', function(request, response){
//   response.render('error', pages.error)
// })

app.use('/registered', pgroutr);
// app.use('/profile', pgroutr);

app.use(express.static(path.join(__dirname, 'public')));

app.use(function (err, response) {
  console.error(err.body)
  response.status(404).render('notfound', pages.notfound);
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, function(){
  console.log(`Listening on PORT ${PORT}`)
})