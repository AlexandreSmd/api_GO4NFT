const express = require('express');
const router = express.Router();
const controller = require('../controller/controller_BENEFICIARYRIGHT');
const apiAuthMiddlewareG = require('../middleware/apiAuthMiddlewareGlobal');

// Route pour obtenir les droits d'un bénéficiaire (autorisé pour tout le monde)
router.get('/beneficiaryright/:id', apiAuthMiddlewareG.checkKeyPairG, controller.getRightsByBeneficiaryID);

module.exports = router;