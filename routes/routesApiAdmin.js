const router = require('express').Router()
const admin = require('../controllers/apiAdmin')

router.get('/createList', admin.getListMovies)
router.post('/createMovie', admin.postCreateMovie)
router.put('/editMovie/:id', admin.editMovie)
router.delete('/removeMovie/:title', admin.deleteMovie) 

 module.exports=router