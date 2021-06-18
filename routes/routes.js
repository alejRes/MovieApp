const router = require ("express").Router();
const user = require ("../controllers/user");
const admin = require ("../controllers/Admin");
//const auth = require ("../controllers/auth")

/* router.get('/', user.home)
router.get('/dashboard', user.dashboard)
router.get('/search', user.search)
router.get('/search/:title', user.searchTitle)
// router.get('/movies', user.movies)

router.post('/signup', user.signup)
router.post('/login', user.login)
router.post('/logout', user.logout)

*/ 

router.get('/movies', admin.getMovie)

router.get('/createMovie', admin.getCreateMovie)

router.get('/editMovie/:id', admin.getUpdMovie)


// router.get('*', user.home)


module.exports = router;