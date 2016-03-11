'use strict';
const express = require('express');
const router = express.Router();
const collection = require('../controllers/collection');
const authenticate = require('../middleware/auth');

router.use(authenticate.verifyToken);
router.get('/app/:appId/collection', collection.getCollectionListing);
router.post('/app/:appId/collection', collection.createCollection);
router.post('/app/:appId/collection/:collectionId/delete', collection.deleteCollection);
router.put('/app/:appId/collection/:collectionId', collection.updateCollection);

module.exports = router;
