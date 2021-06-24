const router = require ("express").Router();
const {user} = require ("../controllers/User")
const admin = require ("../controllers/Admin")
const {isAuth,claims} = require('../middlewares/Auth');
//const auth = require ("./controllers/auth")

// router.get('/', user.home)
router.get('/dashboard', user.dashboard)
router.get('/search', claims, user.search)
router.post('/search', user.searchQuery)
router.get('/search/:title', claims, user.searchTitle)
router.post('/favorites', claims, user.addRemoveFavorite)
router.get('/favorites', claims, user.getFavorites)


/* router.post('/signup', user.signup)
router.post('/login', user.login)
router.post('/logout', user.logout) */

router.get('/movies', claims, admin.getMovie)

router.get('/createMovie', claims, admin.getCreateMovie)

router.get('/editMovie/:id', claims, admin.getUpdMovie)


// router.get('*', user.home)


module.exports = router;