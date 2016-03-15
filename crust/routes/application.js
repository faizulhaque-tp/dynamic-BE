'use strict';
const express = require('express');
const router = express.Router();
const app = require('../controllers/application');
const authenticateMiddleware = require('../middleware/auth');
const appMiddleware = require('../middleware/app');

router.use(authenticateMiddleware.verifyToken);
router.get('/app', app.getAppListing);
router.post('/app', app.createApp);
router.patch('/app/:appId/activate', appMiddleware.verifyApp, app.activateDeactivateApp);
router.post('/app/:appId/delete', appMiddleware.verifyApp, app.deleteApp);
router.put('/app/:appId', appMiddleware.verifyApp, app.updateApp);


module.exports = router;
