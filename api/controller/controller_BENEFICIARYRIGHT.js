const db = require('../middleware/connectDB');

/**
 * @api {get} /beneficiaryrights/GetRightsByBeneficiaryID/:id Get Beneficiary Rights by Beneficiary ID
 * @apiName GetRightsByBeneficiaryID
 * @apiGroup BeneficiaryRights
 *
 * 
 * @apiHeader {String} x-keypub Public key of the actor.
 * @apiHeader {String} x-keyprv Private key of the actor.
 * @apiParam {Number} id ID of the beneficiary.
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
