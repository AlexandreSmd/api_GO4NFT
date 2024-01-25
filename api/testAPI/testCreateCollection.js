const axios = require('axios');

// Remplacez ceci par l'URL de base de votre API
const baseURL = 'http://localhost:3000/api';

// Clé API valide pour les tests (remplacez-la par votre clé API réelle si nécessaire)
const keypub = '123';
const keyprv = '123';

// Fonction de test pour créer une nouvelle collection
async function testCreateCollection() {
  try {
    const newCollection = {
      "Collection_NumberOfNFT": 2,
      "Collection_Name": "Collection_Test",
      "Collection_Symbol": "TEST",
      "recipientAddresses": [
        "0x3e0CaBAac78d2c9Cc88A8D374E2141ae953B4B9A",
        "0x3e0CaBAac78d2c9Cc88A8D374E2141ae953B4B9A"
      ],"metadataArray": [
        {
          "name": "NFT 1",
          "description": "Ceci est un cadeau de la part du créateur Oméga",
          "image": "lien_image_1",
          "rightID": 3
        },
        {
          "name": "NFT 2",
          "description": "Ceci est un cadeau de la part du créateur Oméga",
          "image": "lien_image_2",
          "rightID": 3
        }
      ],
      "Collection_CreatorID": 2,
      "OwnerIdArray": [
        1, 
        2  
      ],
    };

    const response = await axios.post(`${baseURL}/Collection/CreateCollection`, newCollection, {
      headers: {
        'x-actor' : 'CREATOR',
        'x-keypub': keypub,
        'x-keyprv': keyprv,
      },
    });

    console.log('Résultat de la requête POST /collection:');
    console.log(response.data);
  } catch (error) {
    console.error('Erreur lors de la requête POST /collection:', error);
  }
}

// Exécutez la fonction de test pour créer une nouvelle collection
testCreateCollection();