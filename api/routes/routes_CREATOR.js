const express = require('express');
const router = express.Router();
const controller = require('../controller/controller_CREATOR');
const apiAuthMiddleware = require('../middleware/apiAuthMiddleware'); // Importez votre middleware ici
const apiAuthMiddleware2 = require('../middleware/apiAuthMiddleware2');

// Route pour obtenir tous les créateurs (seulement autorisé pour les créator)
router.get('/creator', apiAuthMiddleware.checkKeyPair, controller.getAllCreators);

// Route pour obtenir un créateur par son ID (seulement autorisé pour les créator)
router.get('/creator/:id', apiAuthMiddleware.checkKeyPair, controller.getOneCreatorNameByID);

// Route pour créer un créateur (seulement autorisé pour les administrator)
router.post('/creator', apiAuthMiddleware2.checkKeyPair2, controller.createCreator);


module.exports = router;
