const db = require('../middleware/connectDB');

/**
 * @api {get} /creators/GetAllCreators Get All Creators
 * @apiName GetAllCreators
 * @apiGroup Creator
 * @apiDescription Ce endpoint est disponible pour les administrateurs. Il permet d'obtenir toutes les informations de tous les créateurs.
 * 
 * @apiHeader {String} x-keypub Public key of the actor.
 * @apiHeader {String} x-keyprv Private key of the actor.
 * 
 * @apiParamExample {javascript} Request-Example:
 * 
 * const axios = require('axios');

// Remplacez ceci par l'URL de base de votre API
const baseURL = 'http://92.222.172.127:3000/api';

// Clé publique et privée valide pour les tests (remplacez-les par vos clés réelles si nécessaire)
const keypub = '123';
const keyprv = '123';

// Fonction de test pour obtenir tous les créateurs
async function testGetAllCreator() {
  try {
    const response = await axios.get(`${baseURL}/creator/GetAllCreator`, {
      headers: {
        'x-keypub': keypub,
        'x-keyprv': keyprv,
        'x-actor' : 'ADMINISTRATOR',
      },
    });

    console.log('Résultat de la requête GET /creator/GetAllCreator :');
    console.log(response.data[0]);
  } catch (error) {
    console.error('Erreur lors de la requête GET /creator/GetAllCreator :', error);
  }
}

testGetAllCreator();

 * 
 * @apiSuccess {Object[]} creators List of all creators.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *       {
 *         "Creator_ID": 1,
 *         "Creator_Name": "John Doe",
 *         "Creator_keypub": "0xabc...",
 *         "Creator_keyprv": "0xdef...",
 *         "CREATOR_C": 100
 *       },
 *       // More creators...
 *     ]
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
 * @apiError (500 Internal Server Error) {String} error Server error during data recovery.
 * @apiErrorExample {json} InternalServerError-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Server error during data recovery"
 *     }
 */

// Méthode GET pour obtenir tous les créateurs
const getAllCreators = async (req, res) => {
  try {
    const creators = await db.promise().query('SELECT * FROM CREATOR');
    res.json(creators);
  } catch (error) {
    console.error('Error when retrieving creators :', error);
    res.status(500).json({ error: 'Server error during data recovery' });
  }
};


/**
 * @api {get} /creators/GetAllCreatorName Get All Creator Names
 * @apiName GetAllCreatorName
 * @apiGroup Creator
 *
 * @apiDescription Ce endpoint est disponible pour les créateurs, les bénéficaires et les administrateurs. Il permet d'obtenir tous les noms des créateurs enregistrés.
 * 
 * @apiHeader {String} x-keypub Public key of the actor.
 * @apiHeader {String} x-keyprv Private key of the actor.
 * 
 * @apiParamExample {javascript} Request-Example:
 * 
 * const axios = require('axios');

// Remplacez ceci par l'URL de base de votre API
const baseURL = 'http://92.222.172.127:3000/api';

// Clé publique et privée valide pour les tests (remplacez-les par vos clés réelles si nécessaire)
const keypub = '123';
const keyprv = '123';

// Fonction de test pour obtenir tous les noms des créateurs
async function testGetAllCreatorName() {
  try {
    const response = await axios.get(`${baseURL}/creator/GetAllCreatorName`, {
      headers: {
        'x-keypub': keypub,
        'x-keyprv': keyprv,
        'x-actor' : 'BENEFICIARY',
      },
    });

    console.log('Résultat de la requête GET /creator/GetAllCreatorName :');
    console.log(response.data[0]);
  } catch (error) {
    console.error('Erreur lors de la requête GET /creator/GetAllCreatorName :', error);
  }
}

// Fonction de test pour obtenir tous les noms des créateurs
testGetAllCreatorName();
 * 
 * 
 * @apiSuccess {Object[]} creators List of all creator names.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *       {
 *         "Creator_Name": "John Doe"
 *       },
 *       // More creator names...
 *     ]
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
 * @apiError (500 Internal Server Error) {String} error Server error during data recovery.
 * @apiErrorExample {json} InternalServerError-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Server error during data recovery"
 *     }
 */


// Méthode GET pour obtenir tous les nom des créateurs
const getAllCreatorName = async (req, res) => {
  try {
    const creators = await db.promise().query('SELECT Creator_name FROM CREATOR');
    res.json(creators);
  } catch (error) {
    console.error('Error retrieving creator names :', error);
    res.status(500).json({ error: 'Server error during data recovery' });
  }
};

/**
 * @api {get} /creators/GetOneCreatorNameByID/:id Get Creator Name by ID
 * @apiName GetOneCreatorNameByID
 * @apiGroup Creator
 *
 * 
 * @apiDescription Ce endpoint est disponible pour les créateurs, les bénéficaires et les administrateurs. Il permet d'obtenir un nom de créateur à partir de son ID.
 * 
 * @apiHeader {String} x-keypub Public key of the actor.
 * @apiHeader {String} x-keyprv Private key of the actor.
 * 
 * @apiParam {Number} id ID of the creator.
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

// Fonction de test pour obtenir l'adresse ETH à partir de l'ID du bénéficiaire
async function testGetAllCreator(creatorId) {
  try {
    const response = await axios.get(`${baseURL}/creator/GetCreatorNameWithId/${creatorId}`, {
      headers: {
        'x-keypub': keypub,
        'x-keyprv': keyprv,
        'x-actor' : 'ADMINISTRATOR',
      },
    });

    console.log('Résultat de la requête GET /creator/GetCreatorNameWithId/:id :');
    console.log(response.data[0]);
  } catch (error) {
    console.error('Erreur lors de la requête GET /creator/GetCreatorNameWithId/:id :', error);
  }
}

// Remplacez "creatorId" par l'ID du bénéficiaire que vous souhaitez obtenir
const creatorId = 2; // Par exemple, remplacez 1 par l'ID souhaité

testGetAllCreator(creatorId);

 * 
 * 
 * @apiSuccess {Object} Creator_Name Creator name.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "Creator_Name": "John Doe"
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
 * @apiError (404 Not Found) {String} error Creator not found.
 * @apiErrorExample {json} Not Found-Response :
 *     HTTP/1.1 404 Unauthorized
 *     {
 *       "error": "Creator not found"
 *     }
 * 
 * @apiError (500 Internal Server Error) {String} error Server error when updating the beneficiary.
 * @apiErrorExample {json} InternalServerError-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Server error when updating the beneficiary"
 *     }
 */



// Méthode GET pour obtenir un créateur par son ID
const getOneCreatorNameByID = async (req, res) => {
  const creatorId = req.params.id; // L'ID est extrait des paramètres de l'URL

  try {
    const [rows] = await db.promise().query('SELECT Creator_Name FROM CREATOR WHERE Creator_ID = ?', creatorId);

    // Vérifiez si des résultats ont été trouvés
    if (rows.length === 1) {
      const creatorName = rows[0].Creator_Name;
      res.json({ Creator_Name: creatorName });
    } else {
      res.status(404).json({ error: 'Creator not found' });
    }
  } catch (error) {
    console.error('Error retrieving creator name :', error);
    res.status(500).json({ error: 'Server error during data recovery' });
  }
};




/**
 * @api {post} /creators/Create Create Creator
 * @apiName CreateCreator
 * @apiGroup Creator
 * @apiDescription Ce endpoint est disponible pour les administrateurs. Il permet de créer un créateur.
 * 
 * @apiHeader {String} x-keypub Public key of the actor.
 * @apiHeader {String} x-keyprv Private key of the actor.
 * 
 * @apiParam {String} Creator_Name Name of the creator.
 * @apiParam {String} Creator_keypub Public key of the creator.
 * @apiParam {String} Creator_keyprv Private key of the creator.
 *
 * @apiParamExample {javascript} Request-Example:
 * 
 * const axios = require('axios');

// Remplacez ceci par l'URL de base de votre API
const baseURL = 'http://92.222.172.127:3000/api';

// Clé publique et privée valide pour les tests (remplacez-les par vos clés réelles si nécessaire)
const keypub = '123';
const keyprv = '123';

// Fonction de test pour créer un nouveau créateur
async function testCreateCreator() {
  try {
    const newCreator = {
      Creator_Name: 'Romain',
      Creator_keypub: '122345356',
      Creator_keyprv: '487237543',
    };

    const response = await axios.post(`${baseURL}/creator/createCreator`, newCreator, {
      headers: {
        'x-actor' : 'ADMINISTRATOR',
        'x-keypub': keypub,
        'x-keyprv': keyprv,
      },
    });

    console.log('Résultat de la requête POST /creator/createCreator :');
    console.log(response.data);
  } catch (error) {
    console.error('Erreur lors de la requête POST /creator/createCreator :', error);
  }
}

// Exécutez la fonction de test pour créer un nouveau créateur
testCreateCreator();

 * 
 * 
 * @apiSuccess {String} message Success message.
 * @apiSuccess {Number} id ID of the created creator.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 201 OK
 *     {
 *       "message": "Creator successfully added",
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
 * @apiError (500 Internal Server Error) {String} Server error when creating the creator.
 * @apiErrorExample {json} InternalServerError-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Server error when creating the creator"
 *     }
 */

// Méthode POST pour créer un créateur
const createCreator = async (req, res) => {
  const { Creator_Name, Creator_keypub, Creator_keyprv} = req.body; // Les données sont extraites du corps de la requête

  try {
    const result = await db.promise().query(
      'INSERT INTO CREATOR (Creator_Name, Creator_keypub, Creator_keyprv) VALUES (?, ?, ?)',
      [Creator_Name, Creator_keypub, Creator_keyprv]
    );

    res.status(201).json({ message: 'Creator successfully added', id: result.insertId });
  } catch (error) {
    console.error('Error when creating the creator :', error);
    res.status(500).json({ error: 'Server error when creating the creator' });
  }
};







/**
 * @api {put} /creators/UpdateName/:id Update Creator Name
 * @apiName UpdateNameCreator
 * @apiGroup Creator
 * @apiDescription Ce endpoint est disponible pour les créateurs. Il permet de mettre à jour le nom d'un créateur.
 * 
 * @apiHeader {String} x-keypub Public key of the actor.
 * @apiHeader {String} x-keyprv Private key of the actor.
 * 
 * @apiParam {Number} id ID of the creator.
 * @apiParam {String} Creator_Name New name for the creator.
 *
 * @apiParamExample {javascript} Request-Example:
 * 
 * const axios = require('axios');

// Remplacez ceci par l'URL de base de votre API
const baseURL = 'http://92.222.172.127:3000/api';

// Clé publique et privée valide pour les tests (remplacez-les par vos clés réelles si nécessaire)
const keypub = '123';
const keyprv = '123';

// ID du créateur que vous souhaitez mettre à jour
const CreatorIdToUpdate = 1; 

// Nouveau nom
const updatedName = 'Alexandre'; 

// Fonction de test pour mettre à jour un créateur
async function testUpdateCreatorName(updatedName2) {
  try {
    const updatedName = {
      Creator_name: updatedName2,
    };

    const response = await axios.put(`${baseURL}/creator/UpdateCreatorName/${CreatorIdToUpdate}`, updatedName, {
      headers: {
        'x-keypub': keypub,
        'x-keyprv': keyprv,
        'x-actor': "CREATOR",
      },
    });

    console.log('Résultat de la requête PUT /creator/UpdateCreatorName/ :');
    console.log(response.data);
  } catch (error) {
    console.error('Erreur lors de la requête PUT /creator/UpdateCreatorName/ :', error);
  }
}

// Exécutez la fonction de test pour mettre à jour un créateur
testUpdateBeneficiaryEth();

 * 
 * 
 * @apiSuccess {String} message Success message.
 * @apiSuccess {Number} id ID of the updated creator.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Creator updated successfully",
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
 * 
 * @apiError (404 Not Found) {String} error Creator not found.
 * @apiErrorExample {json} Not Found-Response :
 *     HTTP/1.1 404 Unauthorized
 *     {
 *       "error": "Creator not found"
 *     }
 * 
 * @apiError (500 Internal Server Error) {String} error Server error updating creator.
 * @apiErrorExample {json} InternalServerError-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Server error updating creator"
 *     }
 */


// Méthode PUT pour mettre à jour un créateur
const updateNameCreator = async (req, res) => {
  const { Creator_Name} = req.body;
  const creatorId = req.params.id; // Supposons que vous obtenez l'ID du créateur à partir de la route
  try {
    const results = await db.promise().query(
      'UPDATE CREATOR SET Creator_Name = ? WHERE Creator_ID = ?',
      [Creator_Name, creatorId]
    );


    if (results[0] && results[0].affectedRows !== undefined) {
      if (results[0].affectedRows > 0) {
        res.status(200).json({ message: 'Creator updated successfully', id: creatorId });
      } else {
        res.status(404).json({ error: 'Creator not found' });
      }
    } else {Erreur
      res.status(500).json({ error: 'Server error updating creator' });
    }
  } catch (error) {
    console.error('Error updating creator :', error);
    res.status(500).json({ error: 'EServer error updating creator' });
  }
};




/**
 * @api {put} /creators/UpdateCCreator/:id Update Creator Credits
 * @apiName UpdateCCreator
 * @apiGroup Creator
 *
 * @apiDescription Ce endpoint est disponible pour les administrateurs. Il permet de mettre à jour un compteur C d'un créateur.
 * 
 * @apiHeader {String} x-keypub Public key of the actor.
 * @apiHeader {String} x-keyprv Private key of the actor.
 * 
 * @apiParam {Number} id ID of the creator.
 * @apiParam {Number} Creator_C_add Number of credits to add to the creator.
 *
 * @apiParamExample {javascript} Request-Example:
 * 
 * const axios = require('axios');

// Remplacez ceci par l'URL de base de votre API
const baseURL = 'http://92.222.172.127:3000/api';

// Clé publique et privée valide pour les tests (remplacez-les par vos clés réelles si nécessaire)
const keypub = '123';
const keyprv = '123';

// ID du créateur que vous souhaitez mettre à jour
const creatorIdToUpdate = 1; // Remplacez par l'ID du créateur que vous souhaitez mettre à jour

// Montant à ajouter au crédit du créateur
const C_add = 10; // Remplacez par le montant que vous souhaitez ajouter

// Fonction de test pour mettre à jour le crédit d'un créateur
async function testUpdateCCreator() {
  try {
    const updatedCreator = {
      Creator_C_add: C_add,
    };

    const response = await axios.put(`${baseURL}/creator/UpdateCompteurCreator/${creatorIdToUpdate}`, updatedCreator, {
      headers: {
        'x-actor': "ADMINISTRATOR",
        'x-keypub': keypub,
        'x-keyprv': keyprv,
      },
    });

    console.log('Résultat de la requête PUT /creator/UpdateCompteurCreator/ :');
    console.log(response.data);
  } catch (error) {
    console.error('Erreur lors de la requête PUT /creator/UpdateCompteurCreator/ :', error);
  }
}

// Exécutez la fonction de test pour mettre à jour le crédit d'un créateur
testUpdateCCreator();

 * 
 * 
 * @apiSuccess {String} message Success message.
 * @apiSuccess {Number} id ID of the updated creator.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Creator updated successfully",
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
 * @apiError (404 Not Found) {String} error Creator not found.
 * @apiErrorExample {json} Not Found-Response :
 *     HTTP/1.1 404 Unauthorized
 *     {
 *       "error": "Creator not found"
 *     }
 * 
 * @apiError (500 Internal Server Error) {String} error Server error updating creator.
 * @apiErrorExample {json} InternalServerError-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Server error updating creator"
 *     }
 */

// Méthode PUT pour mettre à jour les crédits d'un créateur
const updateCCreator = async (req, res) => {
  const { Creator_C_add } = req.body;
  const creatorId = req.params.id;

  // Vérifier si le créateur existe
  const [creator] = await db.promise().query('SELECT * FROM CREATOR WHERE Creator_ID = ?', [creatorId]);

  if (!creator || creator.length === 0) {
    return res.status(404).json({ error: 'Créateur inexistant' });
  }

  const currentCCreator = creator[0].CREATOR_C;
  const newCCreator = currentCCreator + Creator_C_add;

  try {
    const results = await db.promise().query(
      'UPDATE CREATOR SET CREATOR_C = ? WHERE Creator_ID = ?',
      [newCCreator, creatorId]
    );

    console.log(results);

    if (results[0] && results[0].affectedRows !== undefined) {
      if (results[0].affectedRows > 0) {
        res.status(200).json({ message: 'Creator updated successfully', id: creatorId });
      } else {
        res.status(404).json({ error: 'Creator not found' });
      }
    } else {
      res.status(500).json({ error: 'Server error updating creator' });
    }
  } catch (error) {
    console.error('Error updating creator :', error);
    res.status(500).json({ error: 'Server error updating creator' });
  }
};

/**
 * @api {get} /creators/IfCreatorExist/:id Check If Creator Exists
 * @apiName IfCreatorExist
 * @apiGroup Creator
 * @apiDescription Ce endpoint est disponible pour les administrateurs. Il permet de savoir si un créateur existe bien quand on lui donne un ID.
 * 
 * @apiHeader {String} x-keypub Public key of the actor.
 * @apiHeader {String} x-keyprv Private key of the actor.
 * 
 * @apiParam {Number} id ID of the creator.
 *
 * @apiParamExample {javascript} Request-Example:
 * 
 * const axios = require('axios');

// Remplacez ceci par l'URL de base de votre API
const baseURL = 'http://92.222.172.127:3000/api';

// Clé publique et privée valide pour les tests (remplacez-les par vos clés réelles si nécessaire)
const keypub = '123';
const keyprv = '123';

const creatorID = 2;

// Fonction de test pour voir si un créateur existe 
async function testIfCreatorExist() {
  try {
    const response = await axios.get(`${baseURL}/creator/ifCreatorExist/${creatorID}`, {
      headers: {
        'x-actor' : 'CREATOR',
        'x-keypub': keypub,
        'x-keyprv': keyprv,
      },
    });

    console.log('Résultat de la requête GET /creator/ifCreatorExist/:id :');
    console.log(response.data);
  } catch (error) {
    console.error('Erreur lors de la requête GET /creator/ifCreatorExist/:id :', error);
  }
}

// Exécutez la fonction de test 
testIfCreatorExist();

 * 
 * @apiSuccess {Boolean} exists Indicates whether the creator exists or not.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "exists": true
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
 * @apiError (404 Not Found) {String} error Creator not found.
 * @apiErrorExample {json} Not Found-Response :
 *     HTTP/1.1 404 Unauthorized
 *     {
 *       "error": "False"
 *     }
 * 
 * @apiError (500 Internal Server Error) {String} error Server Error Retrieving Data.
 * @apiErrorExample {json} InternalServerError-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Server Error Retrieving Data"
 *     }
 */

// Méthode GET pour voir si un créateur existe.
const ifCreatorExist = async (req, res) => {
  try {
      const creatorId = req.params.id;
      const [creator] = await db.promise().query('SELECT * FROM CREATOR WHERE Creator_ID = ?', [creatorId]);

      if (!creator || creator.length === 0) {
          res.status(404).json({ exists: false });
      } else {
          res.status(200).json({ exists: true });
      }
  } catch (error) {
      console.error('Error retrieving creator names :', error);
      res.status(500).json({ error: 'Server Error Retrieving Data' });
  }
};

/**
 * @api {get} /creators/GetCCreator/:id Get Creator Credits
 * @apiName GetCCreator
 * @apiGroup Creator
 * @apiDescription Ce endpoint est disponible pour les créateurs, les bénéficaires et les administrateurs. Il permet de connaitre le nombre de crédits qu'il reste à un créateur.
 * 
 * @apiHeader {String} x-keypub Public key of the actor.
 * @apiHeader {String} x-keyprv Private key of the actor.
 * 
 * @apiParam {Number} id ID of the creator.
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

const creatorID = 2;

async function testGetC() {
  try {
    const response = await axios.get(`${baseURL}/creator/GetCCreator/${creatorID}`, {
      headers: {
        'x-actor' : 'CREATOR',
        'x-keypub': keypub,
        'x-keyprv': keyprv,
      },
    });

    console.log('Résultat de la requête GET /creator/ifCreatorExist/:id :');
    console.log(response.data);
  } catch (error) {
    console.error('Erreur lors de la requête GET /creator/ifCreatorExist/:id :', error);
  }
}

testGetC();

 * @apiSuccess {Object} CREATOR_C Creator credits.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "CREATOR_C": 100
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
 * @apiError (500 Internal Server Error) {String} error Server error during data recovery.
 * @apiErrorExample {json} InternalServerError-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Server error during data recovery"
 *     }
 */


const getCCreator = async (req, res) => {
  try {
    const creatorId = req.params.id;
    const creators = await db.promise().query('SELECT CREATOR_C FROM CREATOR WHERE Creator_ID = ?', [creatorId]);
    res.json(creators[0]);
  } catch (error) {
    console.error('Error retrieving creator C :', error);
    res.status(500).json({ error: 'Server error during data recovery' });
  }
};




module.exports = {
  getAllCreators,
  getOneCreatorNameByID,
  createCreator,
  updateNameCreator,
  updateCCreator,
  getAllCreatorName,
  ifCreatorExist,
  getCCreator
};