const express = require('express');
const router = express.Router();
const controller = require('../controller/controller_NFTRIGHT');
const apiAuthMiddleware = require('../middleware/apiAuthMiddleware');

// Route pour ajouter une ligne à la table NFTRIGHT (requiert une authentification)
router.post('/NFTTORIGHT', apiAuthMiddleware.checkKeyPair, controller.createNFTRight);

module.exports = router;
