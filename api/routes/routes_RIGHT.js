const express = require('express');
const router = express.Router();
const controller = require('../controller/controller_RIGHT');
const apiAuthMiddlewareC = require('../middleware/apiAuthMiddlewareCreator');

// Route pour créer un right (seulement autorisé pour les créateurs)
router.post('/right', apiAuthMiddlewareC.checkKeyPairC, controller.createRight);

module.exports = router;