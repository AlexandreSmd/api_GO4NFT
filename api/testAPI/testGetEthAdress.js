const axios = require('axios');

// Remplacez ceci par l'URL de base de votre API
const baseURL = 'http://localhost:3000/api';

// Clé publique et privée valide pour les tests (remplacez-les par vos clés réelles si nécessaire)
const keypub = '123';
const keyprv = '123';

// Fonction de test pour obtenir l'adresse ETH à partir de l'ID du bénéficiaire
async function testGetETHAddressFromID(beneficiaryId) {
  try {
    const response = await axios.get(`${baseURL}/beneficiary/${beneficiaryId}`, {
      headers: {
        'x-keypub': keypub,
        'x-keyprv': keyprv,
      },
    });

    console.log('Résultat de la requête GET /beneficiary/:id :');
    console.log(response.data);
  } catch (error) {
    console.error('Erreur lors de la requête GET /beneficiary/:id :', error);
  }
}

// Remplacez "beneficiaryId" par l'ID du bénéficiaire que vous souhaitez obtenir
const beneficiaryId = 2; // Par exemple, remplacez 1 par l'ID souhaité

// Exécutez la fonction de test pour obtenir l'adresse ETH à partir de l'ID du bénéficiaire
testGetETHAddressFromID(beneficiaryId);
