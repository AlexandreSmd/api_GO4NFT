const axios = require('axios');

// Remplacez ceci par l'URL de base de votre API
const baseURL = 'http://localhost:3000/api';

// Clé publique et privée valide pour les tests (remplacez-les par vos clés réelles si nécessaire)
const keypub = '123';
const keyprv = '123';

// ID du créateur que vous souhaitez mettre à jour
const creatorIdToUpdate = 1; // Remplacez par l'ID du créateur que vous souhaitez mettre à jour

// Nouveau nom du créateur
const updatedCreatorName = 'Nouveau Nom'; // Remplacez par le nouveau nom que vous souhaitez définir

// Fonction de test pour mettre à jour un créateur
async function testUpdateCreator() {
  try {
    const updatedCreator = {
      Creator_Name: updatedCreatorName,
    };

    const response = await axios.put(`${baseURL}/creator/${creatorIdToUpdate}/name`, updatedCreator, {
      headers: {
        'x-keypub': keypub,
        'x-keyprv': keyprv,
        'x-actor': "ADMINISTRATOR",
      },
    });

    console.log('Résultat de la requête PUT /creator :');
    console.log(response.data);
  } catch (error) {
    console.error('Erreur lors de la requête PUT /creator :', error);
  }
}

// Exécutez la fonction de test pour mettre à jour un créateur
testUpdateCreator();
