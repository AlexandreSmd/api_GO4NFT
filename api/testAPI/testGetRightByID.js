const axios = require('axios');

// Remplacez ceci par l'URL de base de votre API
const baseURL = 'http://localhost:3000/api';

// Clé publique et privée valide pour les tests (remplacez-les par vos clés réelles si nécessaire)
const keypub = '123';
const keyprv = '123';

// Fonction de test pour obtenir les BeneficiaryRight_RightID en fonction de BeneficiaryRight_BeneficiaryID
async function testGetRightsByBeneficiaryID() {
  try {
    const beneficiaryID = 2; // Remplacez ceci par l'ID du bénéficiaire que vous souhaitez interroger

    const response = await axios.get(`${baseURL}/beneficiaryright/${beneficiaryID}`, {
      headers: {
        'x-keypub': keypub,
        'x-keyprv': keyprv,
      },
    });

    console.log('Résultat de la requête GET /beneficiaryright/:id :');
    console.log(response.data);
  } catch (error) {
    console.error('Erreur lors de la requête GET /beneficiaryright/:id :', error);
  }
}

// Exécutez la fonction de test pour obtenir les BeneficiaryRight_RightID en fonction de BeneficiaryRight_BeneficiaryID
testGetRightsByBeneficiaryID();
