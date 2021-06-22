const { Router } = require('express');
const {isAuth,claims} = require('../middlewares/Auth');

const userController = require('../controllers/user')

const router = Router();

router.get('/signup',userController.signUpForm);//BIEN
router.post('/signup',userController.signUp);//ENCRIPTAR LA PASS Y HACER EL INSERT A LA BBDD
// router.get('/login',userController.logIn);
router.get('/', userController.getHome)//BIEN
router.post('/login',userController.logIn);//ENCRIPTAR LA PASS
router.get('/dashboard',claims,userController.getDashboard)
router.get('/logout', userController.logOut)//BIEN



module.exports = router;