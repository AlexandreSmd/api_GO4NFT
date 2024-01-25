const db = require('../middleware/connectDB');

/**
 * @api {get} /beneficiaryrights/GetRightsByBeneficiaryID/:id Get Beneficiary Rights by Beneficiary ID
 * @apiName GetRightsByBeneficiaryID
 * @apiGroup BeneficiaryRights
 *
 * @apiDescription Ce endpoint est disponible pour les administrateurs, les créateurs et les bénéficaire.
 * 
 * @apiHeader {String} x-keypub Public key of the actor.
 * @apiHeader {String} x-keyprv Private key of the actor.
 * @apiParam {Number} id ID of the beneficiary.
 *
 * @apiParamExample {javascript} Request-Example:
 * 
 * const axios = require('axios');

// Remplacez ceci par l'URL de base de votre API
const baseURL = 'http://92.222.172.127:3000/api';

// Clé publique et privée valide pour les tests (remplacez-les par vos clés réelles si nécessaire)
const keypub = '123';
const keyprv = '123';

// Fonction de test pour obtenir les BeneficiaryRight_RightID en fonction de BeneficiaryRight_BeneficiaryID
async function testGetRightsByBeneficiaryID() {
  try {
    const beneficiaryID = 2; // Remplacez ceci par l'ID du bénéficiaire que vous souhaitez interroger

    const response = await axios.get(`${baseURL}/beneficiaryright/${beneficiaryID}`, {
      headers: {
        'x-actor' : 'CREATOR',
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

 * 
 * 
 * 
 * @apiSuccess {Number[]} BeneficiaryRight_RightID Array of Beneficiary Right IDs associated with the beneficiary.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "BeneficiaryRight_RightID": [1, 2, 3]
 *     }
 *
 * @apiError (404 Not Found) {String} error No beneficiary rights found for this beneficiary ID.
 *  @apiErrorExample {json} Not Found-Response :
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "error": "No beneficiary rights found for this beneficiary ID"
 *     }
 *
 * @apiError (401 Unauthorized 1) {String} error Public or private key missing.
 * @apiErrorExample {json} Unauthorized-Response 1:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "error": "Public or private key missing"
 *     }
 *
 * @apiError (401 Unauthorized 2) {String} error Bad actor.
 * @apiErrorExample {json} Unauthorized-Response 2:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "error": "Bad actor"
 *     }
 *
 * @apiError (401 Unauthorized 3) {String} error Invalid key pair.
 * @apiErrorExample {json} Unauthorized-Response 3:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "error": "Invalid key pair"
 *     }
 *
 * @apiError (500 Internal Server Error) {String} error Server error when retrieving BeneficiaryRight_RightIDs.
 * @apiErrorExample {json} InternalServerError-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Server error when retrieving BeneficiaryRight_RightIDs"
 *     }
 */



// Méthode GET pour obtenir tous les BeneficiaryRight_RightID à partir du BeneficiaryRight_BeneficiaryID
const getRightsByBeneficiaryID = async (req, res) => {
  const BeneficiaryID = req.params.id; // L'ID du bénéficiaire est extrait des paramètres de l'URL

  try {
    const [rows] = await db.promise().query('SELECT BeneficiaryRight_RightID FROM BENEFICIARYRIGHT WHERE BeneficiaryRight_BeneficiaryID = ?', BeneficiaryID);

    // Vérifiez si des résultats ont été trouvés
    if (rows.length > 0) {
      const rights = rows.map((row) => row.BeneficiaryRight_RightID);
      res.json({ BeneficiaryRight_RightID: rights });
    } else {
      res.status(404).json({ error: 'No beneficiary rights found for this beneficiary ID' });
    }
  } catch (error) {
    console.error('Error retrieving BeneficiaryRight_RightID:', error);
    res.status(500).json({ error: 'Server error when retrieving BeneficiaryRight_RightIDs' });
  }
};

module.exports = {
  getRightsByBeneficiaryID,
};
