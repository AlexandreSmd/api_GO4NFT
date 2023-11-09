const axios = require('axios');

// Remplacez ceci par l'URL de base de votre API
const baseURL = 'http://localhost:3000/api';

// Clé publique et privée valide pour les tests (remplacez-les par vos clés réelles si nécessaire)
const keypub = '123';
const keyprv = '123';

// Fonction de test pour créer un nouveau créateur
async function testCreateCreator() {
  try {
    const newCreator = {
      Creator_Name: 'Guuus',
      Creator_keypub: '12234556',
      Creator_keyprv: '4872375',
    };

    const response = await axios.post(`${baseURL}/creator`, newCreator, {
      headers: {
        'x-actor' : 'ADMINISTRATOR',
        'x-keypub': keypub,
        'x-keyprv': keyprv,
      },
    });

    console.log('Résultat de la requête POST /creator :');
    console.log(response.data);
  } catch (error) {
    console.error('Erreur lors de la requête POST /creator :', error);
  }
}

// Exécutez la fonction de test pour créer un nouveau créateur
testCreateCreator();
