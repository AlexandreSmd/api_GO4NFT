const axios = require('axios');

// Remplacez ceci par l'URL de base de votre API
const baseURL = 'http://localhost:3000/api';

// Clé publique et privée valide pour les tests (remplacez-les par vos clés réelles si nécessaire)
const keypub = '12345';
const keyprv = '12345';

// Fonction de test pour créer un nouveau "NFTRIGHT"
async function testCreateNFTRight() {
  try {
    const newNFTRight = {
      NFTRIGHT_IDNFT: 1, // Remplacez par l'ID du NFT auquel vous voulez ajouter un NFTRIGHT
      NFTRIGHT_IDRIGHT: 1, // Remplacez par l'ID du RIGHT associé
    };

    const response = await axios.post(`${baseURL}/NFTTORIGHT`, newNFTRight, {
      headers: {
        'x-actor' : 'CREATOR',
        'x-keypub': keypub,
        'x-keyprv': keyprv,
      },
    });

    console.log('Résultat de la requête POST /NFTTORIGHT :');
    console.log(response.data);
  } catch (error) {
    console.error('Erreur lors de la requête POST /NFTTORIGHT :', error);
  }
}

// Exécutez la fonction de test pour créer un nouveau "NFTRIGHT"
testCreateNFTRight();
