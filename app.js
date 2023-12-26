const express = require('express');
const app = express();
const path = require('path');
const rateLimit = require('express-rate-limit');

// Importez vos routes ici
const routesCreator = require('./api/routes/routes_CREATOR'); 
const routesCollection = require('./api/routes/routes_COLLECTION');
const routesBeneficiary = require('./api/routes/routes_BENEFICIARY'); 
const routesRight = require('./api/routes/routes_RIGHT'); 
const routesBeneficiaryRight = require('./api/routes/routes_BENEFICIARYRIGHT'); 
const routesNFTRIGHT = require('./api/routes/routes_NFTRIGHT'); 

app.use(express.json());

// Définir la limite de taux (rate limit)
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // nombre maximal de requêtes par fenêtre
  message: 'Too many request from this IP address, try again later.',
});

app.use('/api', apiLimiter);

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