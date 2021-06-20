const jwt = require('jwt-simple')
const moment = require('moment')




function createToken (user) {

    const payload = {
        sub: user.idUser,
        email:user.Email,
        rol: user.Role,
        iat: moment().unix(),//fecha de cuando se creó el token 
        exp: moment().add(14, 'days').unix(),//fecha de cuando expirará el token
    }

    return jwt.encode(payload,process.env.SECRET_TOKEN)//nos devuelve el token codificado
}

function decodeToken (token) {
    const decoded = new Promise((resolve,reject) => {
        try{
            const payload = jwt.decode(token,process.env.SECRET_TOKEN)

            if(payload.exp <= moment().unix()) {//con esto comprobamos si el token del usuario sigue vigente comparando la expiración con la fecha de creación
                reject ({
                    status: 401,
                    message: 'El token ha expirado'
                })
            }
                resolve(payload)
        }catch(err){
            reject({
                status: 500,
                message: 'Invalid Token'
            })

        }
    })
    return decoded;//si la decodificación va bien devuelve el token decodificado
}



module.exports = {
    createToken,
    decodeToken
} 