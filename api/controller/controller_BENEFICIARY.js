const db = require('../middleware/connectDB');




/**
 * @api {post} /beneficiary/Create Create Beneficiary
 * @apiName CreateBeneficiary
 * @apiGroup Beneficiary
 *
 * @apiDescription Ce endpoint est disponible pour les administrateurs. Il permet à un administrateur de créer un bénéficaire.
 * 
 * @apiHeader {String} x-keypub Public key of the actor.
 * @apiHeader {String} x-keyprv Private key of the actor.
 * 
 * @apiParam {String} Beneficiary_Name Name of the beneficiary.
 * @apiParam {String} Beneficiary_keypub Public key of the beneficiary.
 * @apiParam {String} Beneficiary_keyprv Private key of the beneficiary.
 * @apiParam {String} Beneficiary_ETHAdress Ethereum address of the beneficiary.
 *
 * 
 * @apiParamExample {javascript} Request-Example:
 * 
const axios = require('axios');

// Remplacez ceci par l'URL de base de votre API
const baseURL = 'http://92.222.172.127:3000/api';

// Clé publique et privée valide pour les tests (remplacez-les par vos clés réelles si nécessaire)
const keypub = 'example_keypub';
const keyprv = 'example_keyprv';

// Fonction de test pour créer un nouveau créateur
async function testCreateBeneficiary() {
  try {
    const newBeneficiary = {
      Beneficiary_Name: 'Augustin',
      Beneficiary_keypub: '12343542454356',
      Beneficiary_keyprv: '48732345432375',
      Beneficiary_ETHAdress: '0x95222290DD7278Aa3Ddd389Cc1E1d165CC4BAfe5 ', // L'ID de la collection associée
    };

    const response = await axios.post(`${baseURL}/beneficiary`, newBeneficiary, {
      headers: {
        'x-actor' : 'ADMINISTRATOR',
        'x-keypub': keypub,
        'x-keyprv': keyprv,
      },
    });

    console.log('Résultat de la requête POST /BENEFICIARY :');
    console.log(response.data);
  } catch (error) {
    console.error('Erreur lors de la requête POST /BENEFICIARY :', error);
  }
}

// Exécutez la fonction de test pour créer un nouveau créateur
testCreateBeneficiary();
 * 
 * 
 * 
 * 
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
 * 
 * @apiError (500 Internal Server Error) {String} error Server error checking the key pair.
 * @apiErrorExample {json} InternalServerError-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Server Error when creating beneficiary "
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
 * @apiDescription Ce endpoint est disponible pour les créateurs, les bénéficaires et les administrateurs. Il permet à un acteur de récuper l'adresse Ethereum d'un bénéficiaire (clé publique).
 * 
 * @apiHeader {String} x-keypub Public key of the actor.
 * @apiHeader {String} x-keyprv Private key of the actor.
 * 
 * @apiParam {Number} id ID of the beneficiary.
 *
 * 
 * @apiParamExample {javascript} Request-Example:
 * const axios = require('axios');

// Remplacez ceci par l'URL de base de votre API
const baseURL = 'http://92.222.172.127:3000/api';

// Clé publique et privée valide pour les tests (remplacez-les par vos clés réelles si nécessaire)
const keypub = '123';
const keyprv = '123';

// Fonction de test pour obtenir l'adresse ETH à partir de l'ID du bénéficiaire
async function testGetETHAddressFromID(beneficiaryId) {
  try {
    const response = await axios.get(`${baseURL}/beneficiary/GetEthAddressOfBeneficiary/${beneficiaryId}`, {
      headers: {
        'x-actor' : 'CREATOR',
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

 * 
 * @apiSuccess {String} Beneficiary_ETHAdress Ethereum address of the beneficiary.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "Beneficiary_ETHAdress": "0x1234..."
 *     }
 * 
 * @apiError (404 Not Found) {String} errorBeneficiary not foundD.
 * @apiErrorExample {json} Not Found-Response :
 *     HTTP/1.1 404 Unauthorized
 *     {
 *       "error": "Beneficiary not found"
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
 * @apiError (500 Internal Server Error) {String} error error Server error when retrieving the beneficiary's ethereum address.
 * @apiErrorExample {json} InternalServerError-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "error Server error when retrieving the beneficiary's ethereum address"
 *     }
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
 * @apiDescription Ce endpoint est disponible pour les bénéficaires. Il permet à un bénéficaire de mettre à jour la clé publique Ethereum.
 * 
 * 
 * @apiHeader {String} x-keypub Public key of the actor.
 * @apiHeader {String} x-keyprv Private key of the actor.
 *
 * @apiParam {Number} id ID of the beneficiary.
 * @apiParam {String} Beneficiary_ETHAdress New Ethereum address of the beneficiary.
 *
 * 
 * @apiParamExample {javascript} Request-Example:
 * 
 * const axios = require('axios');

// Remplacez ceci par l'URL de base de votre API
const baseURL = 'http://92.222.172.127:3000/api';

// Clé publique et privée valide pour les tests (remplacez-les par vos clés réelles si nécessaire)
const keypub = '123';
const keyprv = '123';

// ID du bénéficiare que vous souhaitez mettre à jour
const beneficiaryIdToUpdate = 1; 

// Nouvelle adresse eth
const updatedAdress = 'wrsjehbtszhvsrxskgecdb'; // Remplacez par la nouvelle adresse ethereum (clé publique) que vous souhaitez définir

// Fonction de test pour mettre à jour un bénéficaire
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

 * 
 * 
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
 * 
 * @apiError (404 Not Found) {String} error Beneficiary not found.
 * @apiErrorExample {json} Not Found-Response :
 *     HTTP/1.1 404 Unauthorized
 *     {
 *       "error": "Beneficiary not found"
 *     }
 * 
 * @apiError (500 Internal Server Error) {String} error Server error when updating the beneficiary.
 * @apiErrorExample {json} InternalServerError-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Server error when updating the beneficiary"
 *     }
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
 * @apiDescription Ce endpoint est disponible pour les administrateurs. Il permet d'obtenir toutes les informations de tous les bénéficaires.
 * 
 *
 * @apiHeader {String} x-keypub Public key of the actor.
 * @apiHeader {String} x-keyprv Private key of the actor.
 * 
 * @apiParamExample {javascript} Request-Example:
 * 
 * 
 * const axios = require('axios');

// Remplacez ceci par l'URL de base de votre API
const baseURL = 'http://92.222.172.127:3000/api';

// Clé publique et privée valide pour les tests (remplacez-les par vos clés réelles si nécessaire)
const keypub = '123';
const keyprv = '123';

// Fonction de test pour obtenir tous les bénéficiaires
async function testGetAllBeneficiary() {
  try {
    const response = await axios.get(`${baseURL}/beneficiary/GetAllBeneficiary`, {
      headers: {
        'x-keypub': keypub,
        'x-keyprv': keyprv,
        'x-actor' : 'ADMINISTRATOR',
      },
    });

    console.log('Résultat de la requête GET /beneficiary/GetAllBeneficiary :');
    console.log(response.data[0]);
  } catch (error) {
    console.error('Erreur lors de la requête GET /beneficiary/GetAllBeneficiary :', error);
  }
}

// Exécutez la fonction de test pour obtenir tous les bénéficiares
testGetAllBeneficiary();

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
 * *
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
 * @apiError (500 Internal Server Error) {String} error Server error during data recovery.
 * @apiErrorExample {json} InternalServerError-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Server error during data recovery"
 *     }
 */

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