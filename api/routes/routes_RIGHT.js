const express = require('express');
const router = express.Router();
const controller = require('../controller/controller_RIGHT');
const apiAuthMiddlewareC = require('../middleware/apiAuthMiddlewareCreator');
const apiAuthMiddlewareA = require('../middleware/apiAuthMiddlewareAdministrator');
// Route pour créer un right (seulement autorisé pour les créateurs)
router.post('/right/CreateRight', apiAuthMiddlewareC.checkKeyPairC, controller.createRight);

// Route pour obtenir tous les rights (autorisé pour les admins)
router.get('/right/GetAllRight', apiAuthMiddlewareA.checkKeyPairA, controller.getAllRights);

module.exports = router;