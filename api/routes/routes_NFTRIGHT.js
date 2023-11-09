const express = require('express');
const router = express.Router();
const controller = require('../controller/controller_NFTRIGHT');
const apiAuthMiddlewareC = require('../middleware/apiAuthMiddlewareCreator');

// Route pour ajouter une ligne à la table NFTRIGHT (requiert une authentification)
router.post('/NFTTORIGHT', apiAuthMiddlewareC.checkKeyPairC, controller.createNFTRight);

module.exports = router;
