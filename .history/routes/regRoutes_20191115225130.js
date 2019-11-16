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
    if (over18 == 'true'){ //checkbox, it check for the value if its 'true'
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

  
  bcrypt.genSalt(10, (err, salt) =>    ////this part is from Node.js With Passport Authentication Full Project by traversy
      bcrypt.hash(newuser.password, salt, (err, hash) => {
        if(err) throw err;
        newuser.password = hash;
        var obj = {emaill: email, passwr: passw, title: pages.registered.title}//this part
        Usrchma.find({'email': request.body.emailreg}, (err, docs) => { //basically, it looks for the email first, if it matches anything
          if (!docs.length){ //if there is no match
            newuser.save(function (err, newuser){                         
              if (err) return response.render('error', pages.error); //does this
              console.log('document added to collection')
              response.render("registered",obj)
            })
          }else{                
              console.log('EMAIL ALREADY SUBBED', request.body.emailreg);//if there is, does this
              response.render('alreadysub', pages.alreadysub);
          }                                                             //to this part is mine hehehehe
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