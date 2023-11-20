const express = require('express');
const router = express.Router();
const controller = require('../controller/controller_BENEFICIARY');
const apiAuthMiddlewareA = require('../middleware/apiAuthMiddlewareAdministrator');
const apiAuthMiddlewareG = require('../middleware/apiAuthMiddlewareGlobal');
const apiAuthMiddlewareB = require('../middleware/apiAuthMiddlewareBeneficiary');

// Route pour créer un créateur (seulement autorisé pour les administrator)
router.post('/beneficiary/Create', apiAuthMiddlewareA.checkKeyPairA, controller.createBeneficiary);

// Route pour obtenir l'adress eth (autorisé pour tout le monde)
router.get('/beneficiary/GetEthAddressOfBeneficiary/:id', apiAuthMiddlewareG.checkKeyPairG, controller.getETHAdressFromID);

//Route pour mettre à jour l'address eth en tant que beneficaire
router.put('/beneficiary/UpdateBeneficiaryEthAddress/:id', apiAuthMiddlewareB.checkKeyPairB, controller.updateEthAdress);

// Route pour obtenir tous les infos des bénéficaires (autorisé pour tout les admins)
router.get('/beneficiary/GetAllBeneficiary', apiAuthMiddlewareA.checkKeyPairA, controller.getAllBeneficiary);

module.exports = router;