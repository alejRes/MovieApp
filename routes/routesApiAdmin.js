const router = require('express').Router()
const admin = require('../controllers/apiAdmin')
const {isAuth,claims} = require('../middlewares/Auth')

router.get('/createList', claims, admin.getListMovies)
router.post('/createMovie', admin.postCreateMovie)
router.put('/editMovie/:id', admin.editMovie)
router.delete('/removeMovie/:title', admin.deleteMovie) 

 module.exports=router