
const User = require('../models/user')
const service = require('../services/index')

function signUp (req,res){
    const user = new User({
        email: req.body.email,
        displayName: req.body.displayName,//no añadimos el password porque desde mongoose se creaba a partir de los campos por seguridad
        password:req.body.password
    })
    user.save((err) => {
        if(err) res.status(500).send({message: `Error al crear el usuario: ${err}`})

        res.status(200).send({token: service.createToken(user)})
    })
}


function logIn (req,res){
    User.find({email: req.body.email},(err,user) => {
        if(err) return res.status(500).send({message: `Hubo un error en el servidor: ${err}`})
        if(!user) return res.status(404).send({message: `No existe el usuario : ${err}`})

        req.user = user
        /* res.status(200).send({
            message: 'Te has logado correctamente',
            token: service.createToken(user)}) */
            res.cookie("session:cookie", service.createToken(user),{})
    })
}

module.exports = {
    signUp,
    logIn
}