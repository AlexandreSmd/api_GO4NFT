const express = require('express');
const router = express.Router();
const controller = require('../controller/controller_CREATOR');
const apiAuthMiddlewareC = require('../middleware/apiAuthMiddlewareCreator'); // Importez votre middleware ici
const apiAuthMiddlewareA = require('../middleware/apiAuthMiddlewareAdministrator');
const apiAuthMiddlewareG = require('../middleware/apiAuthMiddlewareGlobal');

// Route pour obtenir tous les créateurs (seulement autorisé pour les créator)
router.get('/creator', apiAuthMiddlewareG.checkKeyPairG, controller.getAllCreators);

// Route pour obtenir un créateur par son ID (seulement autorisé pour les créator)
router.get('/creator/:id', apiAuthMiddlewareG.checkKeyPairG, controller.getOneCreatorNameByID);

// Route pour créer un créateur (seulement autorisé pour les administrator)
router.post('/creator', apiAuthMiddlewareA.checkKeyPairA, controller.createCreator);

router.put('/creator/:id2/C', apiAuthMiddlewareA.checkKeyPairA, controller.updateCCreator);

router.put('/creator/:id/name', apiAuthMiddlewareC.checkKeyPairC, controller.updateNameCreator);



module.exports = router;
