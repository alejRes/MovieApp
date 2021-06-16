const port = process.env.PORT || 3000;
const express = require('express');
const app = express();
const authRoutes = require('./routes/Auth')
const cookieSession = require('cookie-session')
const passport = require("passport");




//.env
require('dotenv').config()


//middleware
app.use("/public", express.static("public"))

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
app.set('view engine','pug')
app.set('views','./views')

//PARA UTILIZAR LA SESSION DE COOKIES

app.use(cookieSession({
  // milliseconds of a day
  maxAge: 24*60*60*1000,
  keys:[process.env.COOKIEKEY]
}));

app.use(passport.initialize());
app.use(passport.session());


//PARA CERRAR SESSION 

app.get("/controllers/googleAuth", (req, res) => {
  req.logout();
  res.send(req.user);
});



//para habilitar recepción de JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })


  //routes

  app.get('/',(req,res) => res.render('home')); 
  app.use(authRoutes);
