const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs')
const crypto = require('crypto')




const UserSchema = new Schema({//campos que tendrá nuestro usuario cuando se registre
    username: {
        type: String, 
        unique: true, 
        lowercase: true
    },
    displayName: String,
    avatar: String,
    role:{
        type: String,
        default:'regular',
        enum: [
              'regular',
              'admin'
          ]
              },
    password: { 
        type: String,
        select: false
    },//para que no se envíe el password con los datos del usuario
    signUpDate: {
        type: Date, 
        default: Date.now()},//para que se guarde la fecha en la que se registra el usuario
    lastLogin: Date
})


UserSchema.pre('save', (next) => {
    let user = this;
    if(!user.isModified('password')) return next();

    bcrypt.genSalt(10,(err,salt) => {
        if(err) return next(err);

        bcrypt.hash(user.password,salt,null),(err,hash) => {
            if(err) return next(err)

            user.password = hash
            next()

        }
    })

})

UserSchema.methods.gravatar = function () { //función para dar un avatar a un usuario si no pone él uno
    if(!this.email) return 'https://gravatar.com/avatar/?s=200&d=retro'

    const md5 = crypto.createHash('md5').update(this.email).digest('hex')
    return `https://gravatar.com/avatar ${md5}?s=200&d=retro`}

    module.exports = mongoose.model('User',UserSchema)