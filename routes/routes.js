const router = require ("express").Router();
const user = require ("./controllers/user")
const admin = require ("./controllers/admin")
//const auth = require ("./controllers/auth")

router.get('/', user.home)
router.get('/dashboard', user.dashboard)
router.get('/search', user.search)
router.get('/search/:title', user.searchTitle)
router.get('/movies', user.movies)

router.post('/signup', user.signup)
router.post('/login', user.login)
router.post('/logout', user.logout)

router.post('/login', admin.login)
router.post('/createMovie', admin.createMovie)
//router.get('/movies', isAdmin, admin.getMovie)
router.put('/editMovie/:id', admin.editMovie)
router.delete('/removeMovie', admin.removeMovie)

router.get('*', user.home)

module.exports = router;