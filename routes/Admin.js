const router = require ("express").Router();
const admin = require ("./controllers/admin")

router.post('/login', admin.login)
router.post('/createMovie', admin.createMovie)

router.put('/editMovie/:id', admin.editMovie)
router.delete('/removeMovie', admin.removeMovie)


module.exports = router;