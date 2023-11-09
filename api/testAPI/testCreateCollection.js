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
      "Collection_Name": "Ma Collection",
      "Collection_Symbol": "TESTULTMILE",
      "recipientAddresses": [
        "0x3e0CaBAac78d2c9Cc88A8D374E2141ae953B4B9A",
        "0x3e0CaBAac78d2c9Cc88A8D374E2141ae953B4B9A"
      ],"metadataArray": [
        {
          "name": "NFT 1",
          "description": "Ceci est un dragon",
          "image": "lien_image_1",
          "rightID": 2
        },
        {
          "name": "NFT 2",
          "description": "Ceci est une licorne",
          "image": "lien_image_2",
          "rightID": 2
        }
      ],
      "Collection_CreatorID": 2,
      "OwnerIdArray": [
        1, 
        2  
      ],
    };

    const response = await axios.post(`${baseURL}/collection`, newCollection, {
      headers: {
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