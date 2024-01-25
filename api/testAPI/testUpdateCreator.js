const axios = require('axios');

// Remplacez ceci par l'URL de base de votre API
const baseURL = 'http://92.222.172.127:3000/api';

// Clé publique et privée valide pour les tests (remplacez-les par vos clés réelles si nécessaire)
const keypub = '123';
const keyprv = '123';

// ID du bénéficiare que vous souhaitez mettre à jour
const beneficiaryIdToUpdate = 1; 

// Nouvelle adresse eth
const updatedAdress = 'wrsjehbtszhvsrxskgecdb'; // Remplacez par la nouvelle adresse ethereum (clé publique) que vous souhaitez définir

// Fonction de test pour mettre à jour un créateur
async function testUpdateBeneficiaryEth() {
  try {
    const updatedAdress2 = {
      Beneficiary_ETHAdress: updatedAdress,
    };

    const response = await axios.put(`${baseURL}/beneficiary/UpdateBeneficiaryEthAddress/${creatorIdToUpdate}`, updatedAdress2, {
      headers: {
        'x-keypub': keypub,
        'x-keyprv': keyprv,
        'x-actor': "BENEFICIARY",
      },
    });

    console.log('Résultat de la requête PUT /beneficiary :');
    console.log(response.data);
  } catch (error) {
    console.error('Erreur lors de la requête PUT /beneficiary :', error);
  }
}

// Exécutez la fonction de test pour mettre à jour un créateur
testUpdateBeneficiaryEth();
