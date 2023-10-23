const express = require('express');
const router = express.Router();
const controller = require('../controller/controller_COLLECTION');
const apiAuthMiddleware = require('../middleware/apiAuthMiddlewareCreator'); // Importez votre middleware ici


// Route pour créer une collection
router.post('/collection', apiAuthMiddleware.checkKeyPair, controller.createCollection);

module.exports = router;