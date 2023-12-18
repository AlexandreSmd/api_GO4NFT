const db = require('../middleware/connectDB');

/**
 * @api {get} /beneficiaryrights/GetRightsByBeneficiaryID/:id Get Beneficiary Rights by Beneficiary ID
 * @apiName GetRightsByBeneficiaryID
 * @apiGroup BeneficiaryRights
 *
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
 * @apiError (500 Internal Server Error) {String} error Server error when retrieving BeneficiaryRight_RightIDs.
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
