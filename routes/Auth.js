const { Router } = require('express');
const isAuth = require('../middlewares/Auth');




const router = Router();

router.get('/signup',isAuth.signup_get);
router.post('/signup',isAuth.signup_post);
router.get('/login',isAuth.login_get);
router.post('/login',isAuth.login_post);



module.exports = router;