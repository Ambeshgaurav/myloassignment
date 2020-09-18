const router = require("express").Router();
const userController= require('../Controller/controller')
const authentication= require('../Middleware/Auth')






router.post('/login',userController.Login);
router.post('/register',userController.Register);
router.post('/forgotPassword',authentication.authenticateToken,userController.forgotPassword);
router.post('/checkCode',authentication.authenticateToken,userController.checkCode);
router.post('/resetPassword',authentication.authenticateToken,userController.resetPassword);






module.exports = router;