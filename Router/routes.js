const router = require("express").Router();
const controller= require('../Controller/controller')
const authentication= require('../Middleware/Auth')






router.post('/Login',controller.Login);
router.post('/Register',controller.Register);
router.post('/update',authentication.authenticateToken,controller.Update);
router.post('/read',authentication.authenticateToken,controller.ReadData);
router.post('/Delete',authentication.authenticateToken,controller.DeleteData);





module.exports = router;