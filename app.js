const express = require('express');
const app = express();
const path = require('path');

// Importez vos routes ici
const routesCreator = require('./api/routes/routes_CREATOR'); 
const routesCollection = require('./api/routes/routes_COLLECTION');
const routesBeneficiary = require('./api/routes/routes_BENEFICIARY'); 
const routesRight = require('./api/routes/routes_RIGHT'); 
const routesBeneficiaryRight = require('./api/routes/routes_BENEFICIARYRIGHT'); 
const routesNFTRIGHT = require('./api/routes/routes_NFTRIGHT'); 

app.use(express.json());

// Montez les routes sur un chemin spécifique
app.use('/api', routesCreator);
app.use('/api', routesCollection);
app.use('/api', routesBeneficiary);
app.use('/api', routesRight);
app.use('/api', routesBeneficiaryRight);
app.use('/api', routesNFTRIGHT);

//Lancement de l'API
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'frontend')));

app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});