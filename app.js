const port = process.env.PORT || 3000;
const express = require('express');
const app = express();
const authRoutes = require('./routes/Auth')
const cookieSession = require('cookie-session')
const passport = require("passport");
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser");

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

//para habilitar recepción de JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/",authRoutes)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

//ruta logout
// app.get('/logout', (req, res) => {
//   res.clearCookie('session-cookie');
//   res.redirect('/');
// });