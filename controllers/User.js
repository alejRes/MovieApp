
const User = require('../models/user');
const service = require('../services/index');
const sql = require('../models/sql')

function signUp (req,res){
    const user = new User({
        email: req.body.email,
        password:req.body.password
    })
    user.save((err) => {
        if(err) res.status(500).send({message: `Error al crear el usuario: ${err}`})

        res.status(200).send({token: service.createToken(user)})
    })
}


async function logIn (req,res){
    if(req.body.username && req.body.password ){
        let result = await sql.getUser(req.body.username)
        
        res.cookie("session-cookie", service.createToken(result), {
          maxAge: 60 * 60 * 24 * 5 * 1000,
          httpOnly: true,
        })
        .status(200)
        .json({ result });
    
    }  
}



function getHome(req,res){
    console.log("hola !!!!!")
    res.status(200).render("home");
}

function getDashboard(req,res){
    console.log(res.locals.rol)
    if (res.locals.rol > 0){
        res.redirect(302,'/home')
    }else{
        res.redirect(400,'/')

    }
    res.status(200).render("dashboard");
}

module.exports = {
    signUp,
    logIn,
    getHome,
    getDashboard
}