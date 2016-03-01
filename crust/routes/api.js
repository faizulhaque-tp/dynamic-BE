var express = require('express');
var router = express.Router();
var UserController  = require('../controllers/UserController')

router.use(UserController.verifyToken);

router.post('/newtest',function(req,res,next){
});


router.post('/logout',UserController.Logout);
module.exports = router;
