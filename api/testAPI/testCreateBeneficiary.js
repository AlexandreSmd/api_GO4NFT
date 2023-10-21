const axios = require('axios');

// Remplacez ceci par l'URL de base de votre API
const baseURL = 'http://localhost:3000/api';

// Clé publique et privée valide pour les tests (remplacez-les par vos clés réelles si nécessaire)
const keypub = '123';
const keyprv = '123';

// Fonction de test pour créer un nouveau créateur
async function testCreateBeneficiary() {
  try {
    const newBeneficiary = {
      Beneficiary_Name: 'Gus',
      Beneficiary_keypub: '1234556',
      Beneficiary_keyprv: '487375',
      Beneficiary_ETHAdress: '47', // L'ID de la collection associée
    };

    const response = await axios.post(`${baseURL}/beneficiary`, newBeneficiary, {
      headers: {
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
testCreateBeneficiary();