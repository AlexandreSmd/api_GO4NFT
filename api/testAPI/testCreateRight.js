const axios = require('axios');

// Remplacez ceci par l'URL de base de votre API
const baseURL = 'http://localhost:3000/api';

// Clé publique et privée valide pour les tests (remplacez-les par vos clés réelles si nécessaire)
const keypub = '123';
const keyprv = '123';

// Fonction de test pour créer un nouveau "Right"
async function testCreateRight() {
  try {
    const newRight = {
      Right_Name: 'BB AAAAAAAAAAAAA Right',
    };

    const response = await axios.post(`${baseURL}/right`, newRight, {
      headers: {
        'x-actor' : 'CREATOR',
        'x-keypub': keypub,
        'x-keyprv': keyprv,
      },
    });

    console.log('Résultat de la requête POST /right :');
    console.log(response.data);
  } catch (error) {
    console.error('Erreur lors de la requête POST /right :', error);
  }
}

// Exécutez la fonction de test pour créer un nouveau "Right"
testCreateRight();
