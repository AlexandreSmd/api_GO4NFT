const express = require('express');
const router = express.Router();
const controller = require('../controller/controller_BENEFICIARYRIGHT');
const apiAuthMiddlewareG = require('../middleware/apiAuthMiddlewareGlobal');

// Route pour créer un créateur (seulement autorisé pour les administrator)
router.get('/beneficiaryright/:id', apiAuthMiddlewareG.checkKeyPairG, controller.getRightsByBeneficiaryID);

module.exports = router;