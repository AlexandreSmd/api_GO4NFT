const axios = require('axios');

// Remplacez ceci par l'URL de base de votre API
const baseURL = 'http://92.222.172.127:3000/api';

// Clé publique et privée valide pour les tests (remplacez-les par vos clés réelles si nécessaire)
const keypub = '123';
const keyprv = '123';

// Fonction de test pour obtenir l'adresse ETH à partir de l'ID du bénéficiaire
async function testGetAllCreator(creatorId) {
  try {
    const response = await axios.get(`${baseURL}/creator/GetCreatorNameWithId/${creatorId}`, {
      headers: {
        'x-keypub': keypub,
        'x-keyprv': keyprv,
        'x-actor' : 'ADMINISTRATOR',
      },
    });

    console.log('Résultat de la requête GET /creator/GetCreatorNameWithId/:id :');
    console.log(response.data[0]);
  } catch (error) {
    console.error('Erreur lors de la requête GET /creator/GetCreatorNameWithId/:id :', error);
  }
}

// Remplacez "creatorId" par l'ID du bénéficiaire que vous souhaitez obtenir
const creatorId = 2; // Par exemple, remplacez 1 par l'ID souhaité

testGetAllCreator(creatorId);
