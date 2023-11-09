const express = require('express');
const router = express.Router();
const controller = require('../controller/controller_BENEFICIARY');
const apiAuthMiddlewareA = require('../middleware/apiAuthMiddlewareAdministrator');
const apiAuthMiddlewareG = require('../middleware/apiAuthMiddlewareGlobal');

// Route pour créer un créateur (seulement autorisé pour les administrator)
router.post('/beneficiary', apiAuthMiddlewareA.checkKeyPairA, controller.createBeneficiary);
router.get('/beneficiary/:id', apiAuthMiddlewareG.checkKeyPairG, controller.getETHAdressFromID);

module.exports = router;