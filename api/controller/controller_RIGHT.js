const db = require('../middleware/connectDB');

/**
 * @api {post} /rights/Create Create Right
 * @apiName CreateRight
 * @apiGroup Right
 * @apiDescription Ce endpoint est disponible pour les créateurs. Il permet de créer un droit.
 * 
 * @apiHeader {String} x-keypub Public key of the actor.
 * @apiHeader {String} x-keyprv Private key of the actor.
 * 
 * @apiParam {String} Right_Name Name of the right.
 *
 * 
 * @apiParamExample {javascript} Request-Example:
 * 
 * const axios = require('axios');

const baseURL = 'http://92.222.172.127:3000/api';

// Clé publique et privée valide pour les tests (remplacez-les par vos clés réelles si nécessaire)
const keypub = '123';
const keyprv = '123';

// Fonction de test pour créer un nouveau "Right"
async function testCreateRight() {
  try {
    const newRight = {
      Right_Name: 'Test Right',
    };

    const response = await axios.post(`${baseURL}/right`, newRight, {
      headers: {
        'x-actor' : 'CREATOR',
        'x-keypub': keypub,
        'x-keyprv': keyprv,
      },
    });

    console.log('Résultat de la requête POST /right :');
    console.log(response.data);
  } catch (error) {
    console.error('Erreur lors de la requête POST /right :', error);
  }
}

// Exécutez la fonction de test pour créer un nouveau "Right"
testCreateRight();

 * @apiSuccess {String} message Success message.
 * @apiSuccess {Number} id ID of the created right.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 201 OK
 *     {
 *       "message": "Right successfully added",
 *       "id": 1
 *     }
 *
 *  * @apiError (401 Unauthorized 1) {String} error Public or private key missing.
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
 * @apiError (500 Internal Server Error) {String} error Server Error when creating the right.
 * @apiErrorExample {json} InternalServerError-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Server Error when creating the right"
 *     }
 */


// Méthode POST pour créer un RIGHT
const createRight = async (req, res) => {
  const {Right_Name} = req.body; // Les données sont extraites du corps de la requête

  try {
    const result = await db.promise().query(
      'INSERT INTO rights (Right_Name) VALUES (?)',
      [Right_Name]
    );

    res.status(201).json({ message: 'Right successfully added', id: result.insertId });
  } catch (error) {
    console.error('Error when creating the right :', error);
    res.status(500).json({ error: 'Server Error when creating the right' });
  }
};


/**
 * @api {get} /rights/GetAllRights Get All Rights
 * @apiName GetAllRights
 * @apiGroup Right
 * @apiDescription Ce endpoint est disponible pour les administrateurs. Il permet de voir les informations de tous les droits.
 * 
 * @apiHeader {String} x-keypub Public key of the actor.
 * @apiHeader {String} x-keyprv Private key of the actor.
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

// Fonction de test pour obtenir tous les rights
async function testGetAllRight() {
  try {

    const response = await axios.get(`${baseURL}/right/GetAllRight`, {
      headers: {
        'x-keypub': keypub,
        'x-keyprv': keyprv,
        'x-actor' : 'ADMINISTRATOR',
      },
    });

    console.log('Résultat de la requête GET) /right/GetAllRight :');
    console.log(response.data[0]);
  } catch (error) {
    console.error('Erreur lors de la requête GET /right/GetAllRight :', error);
  }
}

testGetAllCreator();

 * @apiSuccess {Object[]} rights List of rights.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *       {
 *         "Right_ID": 1,
 *         "Right_Name": "Example Right 1"
 *       },
 *       {
 *         "Right_ID": 2,
 *         "Right_Name": "Example Right 2"
 *       }
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
 * @apiError (500 Internal Server Error) {String} error Server Error.
 * @apiErrorExample {json} InternalServerError-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Server Error"
 *     }
 */


// Méthode GET pour obtenir tous les rights qui existe
const getAllRights = async (req, res) => {
  try {
    const rights = await db.promise().query('SELECT * FROM rights');
    res.json(rights);
  } catch (error) {
    console.error('Error while retrieving rights :', error);
    res.status(500).json({ error: 'Server Error' });
  }
};

module.exports = {
  createRight,
  getAllRights
};