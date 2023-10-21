const express = require('express');
const app = express();

// Importez vos routes ici
const routesCreator = require('./api/routes/routes_CREATOR'); 
const routesCollection = require('./api/routes/routes_COLLECTION');
const routesBeneficiary = require('./api/routes/routes_BENEFICIARY'); 
const routesRight = require('./api/routes/routes_RIGHT'); 

//const apiAuthMiddleware = require('./middleware/apiAuthMiddleware'); // Importez votre middleware ici
//const apiAuthMiddleware2 = require('./middleware/apiAuthMiddleware2'); // Importez votre middleware ici
// Middleware global pour vérifier la clé API
//app.use(apiAuthMiddleware.checkKeyPair);
//app.use(apiAuthMiddleware2.checkKeyPair2);


app.use(express.json());

// Montez les routes sur un chemin spécifique
app.use('/api', routesCreator);
app.use('/api', routesCollection);
app.use('/api', routesBeneficiary);
app.use('/api', routesRight);

//Lancement de l'API
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});

//api