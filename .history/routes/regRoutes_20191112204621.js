const express = require('express');
const pgroutr = express.Router();
const Usrchma = require('../models/usrschema');
const pages = require('../pages');
const bcrypt = require('bcryptjs');
const app = express();

pgroutr.post('/', function(request, response){
  const email = request.body.emailreg;
  const passw = request.body.passwordreg;
  const usrnm = request.body.username;
  const over18 = request.body.checkbox2;
  const passw2 = request.body.reppass;
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
      username: usrnm,
      password: passw,
      over_18: ovr()
    }
  );

  
  bcrypt.genSalt(10, (err, salt) => 
      bcrypt.hash(newuser.password, salt, (err, hash) => {
        if(err) throw err;
        newuser.password = hash;
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

    }))
  
})
  

// pgroutr.post('/', function(request, response){
//   const { name, email, passw, passw2 } = request.body;
//   let error =[];

//   if(!name || !mail || !passw || !passw2){
//     error.push({msg: "Please fill all fields"});
//   }

//   if(passw !== passw2){
//     error.push({msg: 'Password do not match'});
//   }

//   if(passw.length < 8){
//     error.push({ msg: 'Password must be atleast 6 characters'});
//   }

//   if(error.length > 0){
//      response.render('registered', {
//       error,
//       name,
//       email,
//       passw,
//       passw2
//     })
//   } else {
    
//   }
// })
  


module.exports = pgroutr;