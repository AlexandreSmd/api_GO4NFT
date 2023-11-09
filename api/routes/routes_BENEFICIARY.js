const express = require('express');
const router = express.Router();
const controller = require('../controller/controller_BENEFICIARY');
const apiAuthMiddlewareA = require('../middleware/apiAuthMiddlewareAdministrator');
const apiAuthMiddlewareG = require('../middleware/apiAuthMiddlewareGlobal');
const apiAuthMiddlewareB = require('../middleware/apiAuthMiddlewareBeneficiary');

// Route pour créer un créateur (seulement autorisé pour les administrator)
router.post('/beneficiary', apiAuthMiddlewareA.checkKeyPairA, controller.createBeneficiary);

// Route pour obtenir l'adress eth (autorisé pour tout le monde)
router.get('/beneficiary/:id', apiAuthMiddlewareG.checkKeyPairG, controller.getETHAdressFromID);

//Route pour mettre à jour l'address eth en tant que beneficaire
router.put('/beneficiary/:id', apiAuthMiddlewareB.checkKeyPairB, controller.updateEthAdress);

module.exports = router;