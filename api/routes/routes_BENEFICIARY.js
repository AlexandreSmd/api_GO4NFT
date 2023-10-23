const express = require('express');
const router = express.Router();
const controller = require('../controller/controller_BENEFICIARY');
const apiAuthMiddleware2 = require('../middleware/apiAuthMiddlewareAdministrator');
const apiAuthMiddleware = require('../middleware/apiAuthMiddlewareCreator');

// Route pour créer un créateur (seulement autorisé pour les administrator)
router.post('/beneficiary', apiAuthMiddleware2.checkKeyPair2, controller.createBeneficiary);
router.get('/beneficiary/:id', apiAuthMiddleware.checkKeyPair, controller.getETHAdressFromID);

module.exports = router;