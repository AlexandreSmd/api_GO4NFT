const express = require('express');
const router = express.Router();
const controller = require('../controller/controller_RIGHT');
const apiAuthMiddleware = require('../middleware/apiAuthMiddleware');

// Route pour créer un créateur (seulement autorisé pour les administrator)
router.post('/right', apiAuthMiddleware.checkKeyPair, controller.createRight);

module.exports = router;