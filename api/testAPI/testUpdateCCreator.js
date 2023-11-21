const axios = require('axios');

// Remplacez ceci par l'URL de base de votre API
const baseURL = 'http://localhost:3000/api';

// Clé publique et privée valide pour les tests (remplacez-les par vos clés réelles si nécessaire)
const keypub = '123';
const keyprv = '123';

// ID du créateur que vous souhaitez mettre à jour
const creatorIdToUpdate = 1; // Remplacez par l'ID du créateur que vous souhaitez mettre à jour

// Montant à ajouter au crédit du créateur
const C_add = 10; // Remplacez par le montant que vous souhaitez ajouter

// Fonction de test pour mettre à jour le crédit d'un créateur
async function testUpdateCCreator() {
  try {
    const updatedCreator = {
      Creator_C_add: C_add,
    };

    const response = await axios.put(`${baseURL}/creator/UpdateCompteurCreator/${creatorIdToUpdate}`, updatedCreator, {
      headers: {
        'x-actor': "ADMINISTRATOR",
        'x-keypub': keypub,
        'x-keyprv': keyprv,
      },
    });

    console.log('Résultat de la requête PUT /creator/C :');
    console.log(response.data);
  } catch (error) {
    console.error('Erreur lors de la requête PUT /creator/C :', error);
  }
}

// Exécutez la fonction de test pour mettre à jour le crédit d'un créateur
testUpdateCCreator();
