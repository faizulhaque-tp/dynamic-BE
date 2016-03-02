'use strict';
const express = require('express');
const router = express.Router();
const app = require('../controllers/application');
const authenticate = require('../middleware/auth');

router.use(authenticate.verifyToken);
router.get('/app',app.getAppListing);
router.post('/app',app.createApp);
router.put('/app/:appId',app.updateApp);

module.exports = router;
