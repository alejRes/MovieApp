const sha1 = require("crypto-js/sha1");

const service = require("../services/index");
const sql = require("../models/sql");


async function signUp(req, res) {
  const user = {
    email: req.body.username,
    password: req.body.password,
    password2: req.body.password2,
  };
  let status;
  let login;
  try{
    status= 200
    login = await sql.createUser(user.email, user.password);

  }catch (e){
    login = null
    console.error(e)
    status=400
  }finally{
    console.log(login)
    if (login.insertId){
      res.cookie('session-cookie', createToken(result))
    }
    res.status(status).redirect('/dashboard')
  }
  

}

function signUpForm(req, res) {
  res.status(200).render("signup");
}

async function logIn(req, res) {
  let result = await sql.getUser(req.body.username, req.body.password);
  console.log("controllers user", result);
  if (result) {
    res
      .cookie("session-cookie", service.createToken(result), {
        maxAge: 60 * 60 * 24 * 5 * 1000,
        httpOnly: true,
      })
      .status(200)
      .render("dashboard");
    //.json({ message: 'Usuario logado' });
  } else {
    res.status(404).send({ message: "Usuario no registrado" });
  }
}

function getHome(req, res) {
  //console.log("hola !!!!!")
  res.status(200).render("home");
}

function getDashboard(req, res) {
  console.log(res.locals.rol);
  if (res.locals.rol > 0) {
    res.redirect(302, "/home");
  } else {
    res.redirect(400, "/");
  }
  res.status(200).render("dashboard");
}
function logOut(req,res){
    res.clearCookie('session-cookie');
    res.redirect('/')
}
module.exports = {
  signUp,
  logIn,
  getHome,
  getDashboard,
  signUpForm,
  logOut
};
