const express = require('express');
const pgroutr = express.Router();
const Usrchma = require('../models/usrschema');
const pages = require('../pages');
const app = express();


pgroutr.post('/', function(request, response){
  const emailog = request.body.email;
  const passwlog = request.body.password;
  const loginuser = new Usrchma(
    {
      email: emailog,
      password: passwlog,
      status: 'online'
    }
  );
  var self = this;
  var obj = {emaill: emailog}

  Usrchma.find({'email': request.body.email, 'password': request.body.password}, function (err, docs) {
    if(!docs.length){
    response.render('error', pages.error);
    }else if (request.body.email == docs[0].email && request.body.password == docs[0].password){
      request.session.emm = request.body.email;
      console.log('user exists: ',self.email);
      response.render("profile", obj)
    }else{                
      console.log('account not found')
    }
});
})


module.exports = pgroutr;