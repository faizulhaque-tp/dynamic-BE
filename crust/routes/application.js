'use strict';
const express = require('express');
const router = express.Router();
const appController = require('../controllers/application');

router.get('/app',appController.getAppListing);
router.post('/app',appController.createApp);

module.exports = router;
