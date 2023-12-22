const db = require('../middleware/connectDB');




/**
 * @api {post} /beneficiary/Create Create Beneficiary
 * @apiName CreateBeneficiary
 * @apiGroup Beneficiary
 *
 * @apiHeader {String} x-keypub Public key of the actor.
 * @apiHeader {String} x-keyprv Private key of the actor.
 * 
 * @apiParam {String} Beneficiary_Name Name of the beneficiary.
 * @apiParam {String} Beneficiary_keypub Public key of the beneficiary.
 * @apiParam {String} Beneficiary_keyprv Private key of the beneficiary.
 * @apiParam {String} Beneficiary_ETHAdress Ethereum address of the beneficiary.
 *
 * @apiSuccess {String} message Success message.
 * @apiSuccess {Number} id ID of the created beneficiary.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 201 OK
 *     {
 *       "message": "Beneficiary successfully added",
 *       "id": 1
 *     }
 *
 * @apiError (500 Internal Server Error) {String} error Server error when creating a beneficiary.
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Server error when creating a beneficiary"
 *     }
 */


// Méthode POST pour créer un créateur
const createBeneficiary = async (req, res) => {
  const { Beneficiary_Name, Beneficiary_keypub, Beneficiary_keyprv, Beneficiary_ETHAdress } = req.body; // Les données sont extraites du corps de la requête

  try {
    const result = await db.promise().query(
      'INSERT INTO BENEFICIARY (Beneficiary_Name, Beneficiary_keypub, Beneficiary_keyprv, Beneficiary_ETHAdress) VALUES (?, ?, ?, ?)',
      [Beneficiary_Name, Beneficiary_keypub, Beneficiary_keyprv, Beneficiary_ETHAdress]
    );

    res.status(201).json({ message: 'Beneficiary successfully added', id: result.insertId });
  } catch (error) {
    console.error('Error when creating beneficiary :', error);
    res.status(500).json({ error: 'Server error when creating a beneficiary' });
  }
};



/**
 * @api {get} /beneficiary/GetEthAddressOfBeneficiary/:id Get Ethereum Address of Beneficiary
 * @apiName GetEthAddressOfBeneficiary
 * @apiGroup Beneficiary
 *
 * @apiHeader {String} x-keypub Public key of the actor.
 * @apiHeader {String} x-keyprv Private key of the actor.
 * 
 * @apiParam {Number} id ID of the beneficiary.
 *
 * @apiSuccess {String} Beneficiary_ETHAdress Ethereum address of the beneficiary.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "Beneficiary_ETHAdress": "0x1234..."
 *     }
 *
 * @apiError (404 Not Found) {String} error Beneficiary not found.
 * @apiError (500 Internal Server Error) {String} error Server error when retrieving the beneficiary's ethereum address.
 */

// Méthode GET pour obtenir l'adresse ETH à partir de l'ID du beneficiare
const getETHAdressFromID = async (req, res) => {
  const BeneficiaryId = req.params.id; // L'ID est extrait des paramètres de l'URL
  try {
    const [rows] = await db.promise().query('SELECT Beneficiary_ETHAdress FROM BENEFICIARY WHERE Beneficiary_ID = ?', BeneficiaryId);
    
    // Vérifiez si des résultats ont été trouvés
    if (rows.length === 1) {
      const BefAdress = rows[0].Beneficiary_ETHAdress;
      res.json({ Beneficiary_ETHAdress: BefAdress });
    } else {
      res.status(404).json({ error: 'Beneficiary not found' });
    }
  } catch (error) {
    console.error('Error when retrieving the beneficiary s ethereum address:', error);
    res.status(500).json({ error: 'Server error when retrieving the beneficiary s ethereum address' });
  }
};

/**
 * @api {put} /beneficiary/UpdateBeneficiaryEthAddress/:id Update Beneficiary's Ethereum Address
 * @apiName UpdateBeneficiaryEthAddress
 * @apiGroup Beneficiary
 * 
 * @apiHeader {String} x-keypub Public key of the actor.
 * @apiHeader {String} x-keyprv Private key of the actor.
 *
 * @apiParam {Number} id ID of the beneficiary.
 * @apiParam {String} Beneficiary_ETHAdress New Ethereum address of the beneficiary.
 *
 * @apiSuccess {String} message Success message.
 * @apiSuccess {Number} id ID of the updated beneficiary.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Beneficiary's eth address successfully updated",
 *       "id": 1
 *     }
 *
 * @apiError (404 Not Found) {String} error Beneficiary not found.
 * @apiError (500 Internal Server Error) {String} error Server error when updating beneficiary.
 */

// Méthode PUT pour mettre à jour un créateur
const updateEthAdress = async (req, res) => {
  const { Beneficiary_ETHAdress} = req.body;
  const beneficiaryId = req.params.id; // Supposons que vous obtenez l'ID du créateur à partir de la route
  try {
    const results = await db.promise().query(
      'UPDATE BENEFICIARY SET Beneficiary_ETHAdress = ? WHERE Beneficiary_ID = ?',
      [Beneficiary_ETHAdress, beneficiaryId]
    );


    if (results[0] && results[0].affectedRows !== undefined) {
      if (results[0].affectedRows > 0) {
        res.status(200).json({ message: 'Beneficiary s eth address successfully updated', id: creatorId });
      } else {
        res.status(404).json({ error: 'Beneficiary not found' });
      }
    } else {
      res.status(500).json({ error: 'Server error when updating beneficiary' });
    }
  } catch (error) {
    console.error('Error updating the beneficiary :', error);
    res.status(500).json({ error: 'Server error when updating the beneficiary' });
  }
};

/**
 * @api {get} /beneficiary/GetAllBeneficiary Get All Beneficiaries
 * @apiName GetAllBeneficiary
 * @apiGroup Beneficiary
 *
 * @apiHeader {String} x-keypub Public key of the actor.
 * @apiHeader {String} x-keyprv Private key of the actor.
 * 
 * @apiSuccess {Object[]} beneficiary List of all beneficiaries.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *       {
 *         "Beneficiary_ID": 1,
 *         "Beneficiary_Name": "John Doe",
 *         "Beneficiary_keypub": "0x1234...",
 *         "Beneficiary_keyprv": "0x5678...",
 *         "Beneficiary_ETHAdress": "0x90ab..."
 *       },
 *       // More beneficiaries...
 *     ]
 *
 * @apiError (500 Internal Server Error) {String} error Server error during data recovery.
 */
// Méthode GET pour obtenir tous les créateurs
const getAllBeneficiary = async (req, res) => {
  try {
    const beneficiary = await db.promise().query('SELECT * FROM BENEFICIARY');
    res.json(beneficiary);
  } catch (error) {
    console.error('Error when retrieving beneficiaries :', error);
    res.status(500).json({ error: 'Server error during data recovery' });
  }
};



module.exports = {
  createBeneficiary,
  getETHAdressFromID,
  updateEthAdress,
  getAllBeneficiary,
};