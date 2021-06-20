const port = process.env.PORT || 3000;
const express = require('express');
const app = express();
const authRoutes = require('./routes/Auth')
const cookieSession = require('cookie-session')
const passport = require("passport");
const jwt = require("jsonwebtoken")
const admin = require("firebase-admin");
const cookieParser = require("cookie-parser");
const key="-----BEGIN PRIVATE KEY-----\nMIIEuwIBADANBgkqhkiG9w0BAQEFAASCBKUwggShAgEAAoIBAQDX4CdwMaCuGAhU\nbwX6Tsg+2rj7boXbenYbx2oyMEXyVnFLr5Kyr5RUdWQ3uf3k+1MRmWS838/8OWvU\nYw+xPpgF2gLfkp6IqyiPSLvp6b/BD1fXOpWjIi8CbmlfnDU9In1i+3OHSQmYa1VH\n2Vc0sgTnAjEFE5NEksaXx8rEFir5QgDlmwIapWX8x5FnnGN01uZNUquZyup790Hp\n45QYbwJoxzMS42fLKPdH7Iehfmt3vGzRDiq5mb9grXQXk/5ZDK6BROIZKFerxDIY\nFGoJ8FmHmx4qw8denZ9XpytDTh+nfzYpe9BS+52KhUobKK5LLlIkQ5rl/cOJl5mt\nuVUjr/DrAgMBAAECggEAQS6tKdrKThbymPAHCYv1OclYNo8qOtmwxPWDEtFxpVlF\nj1ldvbd3XcMudgciaxwZ+oPrH36i8eEytmgM6nNges/Xs0M1vEWWEyGen+QVIsmr\nt9C4MxBUynKlPZnQl3uNCbCsMwqyK4QpNW8iPkaMZWZLf+Fnw7pf3Z+VkXyyEB24\nMW4xrzA16yL/Cii4t5qSn0naIEpBVtJLvYi5AGGZoUKVhOpU1VnxhV2PC2P7oMcf\nGAkEzkCsDmHhO6oBh5qaBEcXH+iO0vLTD89Opz8kGsTEr+BIDCAxxDsFLTP0nkFk\nOMSUjagCZS2WACAAKUQzU3CF/X1jaujknNdD9GmR7QKBgQD4e5IQPFVGSGC0wNVL\n08qPfoDGLvmELGiC3GNj2ZA27SHxk97FT7DEk31EXA4PgeXL8P0lr2gaAZQMUbSo\nMWtUM1C0swTirVcPMcmvue+fFlO49xaOM/jXiMeGX2YaYCg1v5P4cvGtSUdb+tu5\niJoyu6zxtSgqxtevEHsgteEGXwKBgQDeaAz0Jz03H05jwUgmx8VRz0KVVIKN+wHi\nEYL501g+1flZEtELxCHJzyeRcvNCky3X86HHNHB53upsgdqjUkmnD2WBSafgChSY\nwIzrX+lLkZpnqHHWf64+w1SMe2n+GJRjFk3YiCiFO5HCJQ+z/Q4EwB1Lj3mi+hot\nIDQwGWoo9QKBgGYsSY8rf9T6helNMWeQmsYOOl1Di43xxLeqb6PrHgW31DFFoGB5\nuDHcg7HMOGvf+eG2IiGQ0rl+1KWMI0DVsVBaGWF0Cxo6NIYm7su3JPTBdYOk9j1a\n2YOm1oRGTfGigGY5dFrAyOd8Lj+AE0FjDiS2TxLEbtPIF4AAwuBcaT75AoGBAME5\nkReGB88eKdLNF8xpf2smMGjgtVR5IRexsyMtlNtyt2HF0Uzxp5FXor7hKatLh2a5\nSnJxgs6+9tgysSt30HmODNgYj/s7hs13bHcKKvv2kjlAxTZgU5g/x/MNPfb+j9zO\nge9/zASEzovn+w6a6lUCO/Frw3fu5lMSSYUIb40JAn9C4bUN6+fSiptKFM5Ka2/d\n7yUqffBc7lheF7vqcWGJpD6Xe56jgvSG7vnhkWWiTUMnIdBfDk6XuA4kHq2iC13O\nooDHLDr3MVCrg8n6I9l7z6Kh4er8gMdpkOI2iodaAk485VzxnedTm4AY9hpQfgBH\n3T3iZQbXc3zi7naKeCfZ\n-----END PRIVATE KEY-----\n"





//.env
require('dotenv').config()


//middleware
app.use("/public", express.static("public"))
app.use(cookieParser());

//acceso de admin

function isAdmin(req, res, next) {
    if (req.query.API_KEY == "123abcd") {//OJO AQUÍ HAY QUE CONFIGURAR  PASS DE ADMIN
      next();
    } else {
      res.status(403).send(`Sorry but you are not an admin and you do not have access to route ${req.url}`);
    }
  }

// Descomentar para probar middelware
//app.use(isAdmin);


//motor vista
app.set('view engine', 'pug');
app.set('views','./views');

//PARA UTILIZAR LA SESSION DE COOKIES

app.use(cookieSession({
  // milliseconds of a day
  maxAge: 24*60*60*1000,
  keys:[process.env.COOKIEKEY]
}));

app.use(passport.initialize());
app.use(passport.session());



//para habilitar recepción de JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(authRoutes)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })


 


  //CONFIGURACIÓN FIREBASE

  admin.initializeApp({
    credential: admin.credential.cert({
        "private_key": key.replace(/\\n/g, '\n'),
        "client_email": process.env.GOOGLE_CLIENT_EMAIL,
        "project_id": process.env.GOOGLE_ID_PROJECT
    })
});

//firebase routes



//ruta logout
app.get('/logout', (req, res) => {
  res.clearCookie('__session');
  res.redirect('/');
});



app.get('/success', checkCookie, (req, res) => {
  res.sendFile(__dirname + './views/index.html');
  console.log("UID of Signed in User is" 
          + req.decodedClaims.uid);
  // You will reach here only if session
  // is working Fine
});
 

app.get('savecookie', (req, res) => {
  const Idtoken=req.query.token;
  setCookie(Idtoken, res);
});

function savecookie(idtoken, res) {
   
  const expiresIn = 60 * 60 * 24 * 5 * 1000;
  admin.auth().createSessionCookie(idtoken, {expiresIn})
  .then((sessionCookie) => {
     const options = {maxAge: expiresIn, 
              httpOnly: true, secure: true};
 
     admin.auth().verifyIdToken(idtoken)
      .then(function(decodedClaims) {
         res.redirect('/success');
     });
  }, error => {
      res.status(401).send("UnAuthorised Request");
  });
}


function checkCookie(req, res, next) {
   
  const sessionCookie = req.cookies.__session || '';
  admin.auth().verifySessionCookie(
      sessionCookie, true).then((decodedClaims) => {
          req.decodedClaims = decodedClaims;
          next();
      })
      .catch(error => {

         // Session cookie is unavailable or invalid. 
         // Force user to login.
         res.redirect('/');
      });
}