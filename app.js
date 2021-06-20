const port = process.env.PORT || 3000;
const express = require('express');
const app = express();
const authRoutes = require('./routes/Auth')
const cookieSession = require('cookie-session')
const passport = require("passport");
const jwt = require("jsonwebtoken")
const admin = require("firebase-admin");
const cookieParser = require("cookie-parser");
const key= process.env.PRIVATE_KEY;





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
        "private_key": (process.env.PRIVATE_KEY).replace(/\\n/g, '\n'),
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