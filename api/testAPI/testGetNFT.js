const axios = require('axios');

// Remplacez ceci par l'URL de base de votre API
const baseURL = 'http://localhost:3000/api';

// Clé publique et privée valide pour les tests (remplacez-les par vos clés réelles si nécessaire)
const keypub = '123';
const keyprv = '123';

// Fonction de test pour obtenir tous les NFTs d'une collection
async function testGetAllNftByIDCollection(collectionId) {
  try {
    const response = await axios.get(`${baseURL}/nft/GetAllNft/${collectionId}`, {
      headers: {
        'x-actor' : 'ADMINISTRATOR',
        'x-keypub': keypub,
        'x-keyprv': keyprv,
      },
    });

    console.log('Résultat de la requête GET /nft/GetAllNft/:id :');
    console.log(response.data);
  } catch (error) {
    console.error('Erreur lors de la requête GET /nft/GetAllNft/:id :', error);
  }
}

// Remplacez "collectionId" par l'ID de la collection que vous souhaitez obtenir
const collectionId = 1; // Par exemple, remplacez 1 par l'ID souhaité

// Exécutez la fonction de test pour obtenir tous les NFTs d'une collection
testGetAllNftByIDCollection(collectionId);
