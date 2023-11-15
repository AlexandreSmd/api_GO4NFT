const express = require('express');
const router = express.Router();
const controller = require('../controller/controller_NFTRIGHT');
const apiAuthMiddlewareC = require('../middleware/apiAuthMiddlewareCreator');

// Route pour ajouter une ligne à la table NFTRIGHT (seulment autorisé pour les créateurs)
router.post('/nft/LinkRightToNFT', apiAuthMiddlewareC.checkKeyPairC, controller.createNFTRight);

module.exports = router;
