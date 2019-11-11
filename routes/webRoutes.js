const express = require('express');
const pgroutr = express.Router();
const Usrchma = require('../models/usrschema');
const pages = require('../pages');
const app = express();

pgroutr.post('/', function(request, response){
  const email = request.body.emailreg;
  const passw = request.body.passwordreg;
  const over18 = request.body.checkbox2;
  const name = request.body.name;

  const ovr = () =>{
    if (over18 == 'true'){
      return true
    }else{
      return false
    }
  }

  console.log(ovr())
  const newuser = new Usrchma(
    {
      name: name,
      email: email,
      password: passw,
      over_18: ovr()
    }
  );

  var obj = {emaill: email, passwr: passw, title: pages.registered.title}

  Usrchma.find({'email': request.body.emailreg}, (err, docs) => {
      if (!docs.length){
        newuser.save(function (err, newuser){
          if (err) return response.render('error', pages.error);
          console.log('document added to collection')
          response.render("registered",obj)
        })
      }else{                
          console.log('EMAIL ALREADY SUBBED', request.body.emailreg);
          response.render('alreadysub', pages.alreadysub);
      }
  });
    
})
  


// pgroutr.post('/', function(request, response){
//   const emailog = request.body.email;
//   const passwlog = request.body.password;
//   console.log(emailog)
//   const loginuser = new Usrchma(
//     {
//       email: emailog,
//       password: passwlog,
//       status: 'online'
//     }
//   );
//   var self = this;
//   var obj = {emaill: emailog}

//   Usrchma.find({'email': self.email, 'password': self.password}, function (err, docs) {
//     if (!self.email){
//         console.log('account not found')
//     }else{                
//       console.log('user exists: ',self.email);
//         response.render("profile", obj)
//     }
// });
// })

module.exports = pgroutr;