var express = require('express');
var router = express.Router();
var UserController  = require('../controllers/UserController')
router.post('/register',UserController.Register);
/* GET home page. */

module.exports = router;
