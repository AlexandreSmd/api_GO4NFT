const express = require('express');
const router = express.Router();
const controller = require('../controller/controller_CREATOR');
const apiAuthMiddlewareC = require('../middleware/apiAuthMiddlewareCreator'); // Importez votre middleware ici
const apiAuthMiddlewareA = require('../middleware/apiAuthMiddlewareAdministrator');
const apiAuthMiddlewareG = require('../middleware/apiAuthMiddlewareGlobal');

// Route pour obtenir tous les créateurs (autorisé pour les admins)
router.get('/creator/GetAllCreator', apiAuthMiddlewareA.checkKeyPairA, controller.getAllCreators);

// Route pour obtenir un créateur par son ID (autorisé pour tout le monde)
router.get('/creator/GetCreatorNameWithId/:id', apiAuthMiddlewareG.checkKeyPairG, controller.getOneCreatorNameByID);

// Route pour obtenir un créateur par son ID (autorisé pour tout le monde)
router.get('/creator/GetAllCreatorName', apiAuthMiddlewareG.checkKeyPairG, controller.getAllCreatorName);

// Route pour créer un créateur (seulement autorisé pour les administrator)
router.post('/creator/createCreator', apiAuthMiddlewareA.checkKeyPairA, controller.createCreator);

// Route pour rajouter des crédits à un créateur (seulement autorisé pour les administrator)
router.put('/creator/UpdateCompteurCreator/:id', apiAuthMiddlewareA.checkKeyPairA, controller.updateCCreator);

// Route pour changer le nom d'un créateur (seulement autorisé pour les créateurs)
router.put('/creator/UpdateCreatorName/:id', apiAuthMiddlewareC.checkKeyPairC, controller.updateNameCreator);

//Route pour voir si le créateur id existe (1 si oui 0 sinon)
router.get('/creator/ifCreatorExist/:id', apiAuthMiddlewareA.checkKeyPairA, controller.ifCreatorExist);

//Route pour voir le compteur d'un creator
router.get('/creator/GetCCreator/:id', apiAuthMiddlewareG.checkKeyPairG, controller.getCCreator);

module.exports = router;