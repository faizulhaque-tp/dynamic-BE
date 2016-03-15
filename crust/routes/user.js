'use strict';
const express = require('express');
const router = express.Router();
const user = require('../controllers/user');
const authenticateMiddleware = require('../middleware/auth');

router.post('/register', user.register);
router.post('/logout', authenticateMiddleware.verifyToken, user.logout);
router.post('/login', user.login);

module.exports = router;
