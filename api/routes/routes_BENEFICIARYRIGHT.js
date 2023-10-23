const express = require('express');
const router = express.Router();
const controller = require('../controller/controller_BENEFICIARYRIGHT');
const apiAuthMiddleware = require('../middleware/apiAuthMiddlewareCreator');

// Route pour créer un créateur (seulement autorisé pour les administrator)
router.get('/beneficiaryright/:id', apiAuthMiddleware.checkKeyPair, controller.getRightsByBeneficiaryID);

module.exports = router;