const { Router } = require('express');
const {isAuth,claims} = require('../middlewares/Auth');

const userController = require('../controllers/user')




const router = Router();

router.get('/signup',userController.signUp);
router.post('/signup',userController.signUp);
router.get('/login',userController.logIn);
router.get('/', userController.getHome)
router.post('/login',userController.logIn);
router.get('/dashboard',claims,userController.getDashboard)



module.exports = router;