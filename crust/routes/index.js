var express = require('express');
var router = express.Router();
var UserController  = require('../controllers/UserController')

router.post('/register',UserController.Register);
router.post('/authorize',UserController.Authenticate);

router.get('/logout',UserController.Authenticate);


/* GET home page. */

module.exports = router;
