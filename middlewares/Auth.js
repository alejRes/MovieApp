const services = require('../services/index')


function isAuth (req,res,next){//se añade como parámetro next para que no se quede esperando la respuesta y continúe
    const cookie = req.cookies.session-cookie
    if(!req.headers.authorization){
        return res.status(403).send({message: 'Prohibido el acceso'})//código de prohibidoel acceso
    }
const token = req.headers.authorization.split(" ")[1]//aquí le decimos que nos coja el token de las cabeceras y que nos cree un array deglosandolo con el método split y 
//como está formado por un texto que pone bearer + token le decimos que queremos la posic.1 porque es la que corresponde al token

services.decodeToken(token)
services.decodeToken(cookie)
.then(response => {
    req.user = response
    next()
})
    .catch(response => {
        res.status(response.status)
    })

}

module.exports = isAuth