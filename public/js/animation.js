let loginn = document.querySelector('#loginst');
let regg = document.querySelector('#regist');
let regbut = document.querySelector('.regbutt');
let logbutt = document.querySelector('.logbutt');
let password = document.querySelector('#passwordreg');
let reppas = document.querySelector('#reppass');
let subreg = document.querySelector('#subreg');
let loginst = document.querySelector('#loginst');
let regist = document.querySelector('#regist');
let name = document.querySelector('#name');




function same(){
  if (password.value != reppas.value){
    subreg.className = 'subreg2'
    subreg.disabled = true;
  }else if(password.value == '' && reppas.value == ''){
    subreg.className = 'subreg2'
    subreg.disabled = true;
  } else {
    subreg.className = 'subreg3'
    subreg.disabled = false;
  }
}




password.addEventListener('keyup', same);
reppas.addEventListener('keyup', same);

function randomLetter(value, idlabel){
  var theLetters = "abcdefghijklmnopqrstuvwxyz123456789#%&^+=-"; //You can customize what letters it will cycle through
  var emm = value;
  var  // Your text goes here
  speed = 15; // ms per frame
  var increment = 8; // frames per step. Must be >2
  
      
  var clen = emm.length;       
  var si = 0;
  var stri = 0;
  var block = "";
  var fixed = "";
  //Call self x times, whole function wrapped in setTimeout
  (function rustle (i) {          
  setTimeout(function () {
    if (--i){rustle(i);}
    nextFrame(i);
    si = si + 1;        
  }, speed);
  })(clen*increment+1); 
  function nextFrame(pos){
    for (var i=0; i<clen-stri; i++) {
      //Random number
      var num = Math.floor(theLetters.length * Math.random());
      //Get random letter
      var letter = theLetters.charAt(num);
      block = block + letter;
    }
    if (si == (increment-1)){
      stri++;
    }
    if (si == increment){
    // Add a letter; 
    // every speed*10 ms
    fixed = fixed +  emm.charAt(stri - 1);
    si = 0;
    }
  
    document.querySelector('#'+ idlabel).innerHTML = fixed + block;
    block = "";
  }
  };
// haha("Email", "label1");
// haha("Password", "label2");
randomLetter("Email", "regemail");
randomLetter("Password", "regpw");
randomLetter("Repeat Password", "regreppw");
randomLetter("Name", "regname");
// regbut.addEventListener('click', function(){
//   loginn.className = 'login2';
//   regg.className = 'registration2';
//   randomLetter("Email", "regemail");
//   randomLetter("Password", "regpw");
//   randomLetter("Repeat Password", "regreppw");
//   loginst.disabled = true;
//   regist.disabled = false;
// })

// logbutt.addEventListener('click', function(){
//   loginn.className = 'login';
//   regg.className = 'registration';
//   haha("Email", "label1");
//   haha("Password", "label2");
//   loginst.disabled = false;
//   regist.disabled = true;
// })