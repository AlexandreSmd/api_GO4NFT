const express = require('express');
const router = express.Router();
const controller = require('../controller/controller_COLLECTION');

const apiAuthMiddlewareC = require('../middleware/apiAuthMiddlewareCreator'); // Importez votre middleware ici
const apiAuthMiddlewareA = require('../middleware/apiAuthMiddlewareAdministrator');
const apiAuthMiddlewareG = require('../middleware/apiAuthMiddlewareGlobal');

// Route pour créer une collection (seulement autorisé pour les créateurs)
router.post('/Collection/CreateCollection', apiAuthMiddlewareC.checkKeyPairC, controller.createCollection);

// Route pour obtenir toutes les collections (autorisé pour les admins)
router.get('/right/GetAllRight', apiAuthMiddlewareA.checkKeyPairA, controller.getAllCollection);

// Route pour obtenir tous les NFTs d'une collection (autorisé pour tout le monde)
router.get('/nft/GetAllNft/:id', apiAuthMiddlewareG.checkKeyPairG, controller.getAllNftByIDCollection);

module.exports = router;