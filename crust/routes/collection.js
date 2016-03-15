'use strict';
const express = require('express');
const router = express.Router();
const collection = require('../controllers/collection');
const authenticateMiddleware = require('../middleware/auth');
const appMiddleware = require('../middleware/app');

router.use(authenticateMiddleware.verifyToken);
router.get('/app/:appId/collection', appMiddleware.verifyApp, collection.getCollectionListing);
router.post('/app/:appId/collection', appMiddleware.verifyApp, collection.createCollection);
router.post('/app/:appId/collection/:collectionId/delete', appMiddleware.verifyApp, collection.deleteCollection);
router.put('/app/:appId/collection/:collectionId', appMiddleware.verifyApp, collection.updateCollection);

module.exports = router;
