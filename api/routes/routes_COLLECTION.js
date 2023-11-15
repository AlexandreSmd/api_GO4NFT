const express = require('express');
const router = express.Router();
const controller = require('../controller/controller_COLLECTION');
const apiAuthMiddlewareC = require('../middleware/apiAuthMiddlewareCreator'); // Importez votre middleware ici


// Route pour créer une collection (seulement autorisé pour les créateurs)
router.post('/Collection/CreateCollection', apiAuthMiddlewareC.checkKeyPairC, controller.createCollection);

module.exports = router;