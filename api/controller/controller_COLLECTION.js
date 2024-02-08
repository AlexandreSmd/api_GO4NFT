const db = require('../middleware/connectDB');
const { mintNFTA } = require('./mint-collection');

/**
 * @api {post} /collection/Create Create Collection
 * @apiName CreateCollection
 * @apiGroup Collection
 *
 * @apiDescription Ce endpoint est disponible pour les créateurs. Il permet à un créateur de dépoyer un smart contract sur Ethereum et de minter n NFTs à certaines adresses.
 * 
 * 
 * @apiHeader {String} x-keypub Public key of the actor.
 * @apiHeader {String} x-keyprv Private key of the actor.
 *
 * @apiParam {Number} Collection_NumberOfNFT Number of NFTs in the collection.
 * @apiParam {String} Collection_Name Name of the collection.
 * @apiParam {String} Collection_Symbol Symbol of the collection.
 * @apiParam {Array} metadataArray Array of NFT metadata.
 * @apiParam {Array} recipientAddresses Array of recipient addresses.
 * @apiParam {Number} Collection_CreatorID ID of the collection creator.
 * @apiParam {Array} OwnerIdArray Array of NFT owner IDs.
 *
 * @apiParamExample {javascript} Request-Example:
 * 
 * const axios = require('axios');

// Remplacez ceci par l'URL de base de votre API
const baseURL = 'http://localhost:3000/api';

// Clé API valide pour les tests (remplacez-la par votre clé API réelle si nécessaire)
const keypub = '123';
const keyprv = '123';

// Fonction de test pour créer une nouvelle collection
async function testCreateCollection() {
  try {
    const newCollection = {
      "Collection_NumberOfNFT": 2,
      "Collection_Name": "Collection_Test",
      "Collection_Symbol": "TEST",
      "recipientAddresses": [
        "0x3e0CaBAac78d2c9Cc88A8D374E2141ae953B4B9A",
        "0x3e0CaBAac78d2c9Cc88A8D374E2141ae953B4B9A"
      ],"metadataArray": [
        {
          "name": "NFT 1",
          "description": "Ceci est un cadeau de la part du créateur Oméga",
          "image": "lien_image_1",
          "rightID": 3
        },
        {
          "name": "NFT 2",
          "description": "Ceci est un cadeau de la part du créateur Oméga",
          "image": "lien_image_2",
          "rightID": 3
        }
      ],
      "Collection_CreatorID": 2,
      "OwnerIdArray": [
        1, 
        2  
      ],
    };

    const response = await axios.post(`${baseURL}/Collection/CreateCollection`, newCollection, {
      headers: {
        'x-actor' : 'CREATOR',
        'x-keypub': keypub,
        'x-keyprv': keyprv,
      },
    });

    console.log('Résultat de la requête POST /collection:');
    console.log(response.data);
  } catch (error) {
    console.error('Erreur lors de la requête POST /collection:', error);
  }
}

// Exécutez la fonction de test pour créer une nouvelle collection
testCreateCollection();
 * 
 * 
 * @apiSuccess {String} message Success message.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 201 OK
 *     {
 *       "message": "Collection successfully added"
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
 * @apiError (500 Internal Server Error) {String} error Error when inserting data in the COLLECTION table.
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Error when inserting data in the COLLECTION table:"
 *     }
 */

const createCollection = async (req, res) => {
  const { Collection_NumberOfNFT, Collection_Name, Collection_Symbol, metadataArray, recipientAddresses, Collection_CreatorID, OwnerIdArray } = req.body;


  const { 'x-keypub': keypub, 'x-keyprv': keyprv } = req.headers;
  const [nb] = await db.promise().query('SELECT Creator_C FROM CREATOR WHERE Creator_keypub = ? AND Creator_keyprv = ?', [keypub, keyprv]);
  console.log(nb);

  
// Vérification du crédit du créateur
  if (nb[0].Creator_C < Collection_NumberOfNFT) {
     throw new Error('The creator doesn t have enough credit');
} else {
  // Le créateur a suffisamment de crédit
  // On diminue le crédit du créateur
  await db.promise().query('UPDATE CREATOR SET Creator_C = Creator_C - ? WHERE Creator_keypub = ? AND Creator_keyprv = ?', [Collection_NumberOfNFT, keypub, keyprv]);
}

  // Utilisez une variable pour suivre l'état de l'opération
  let operationSuccessful = false;

  // Appelez la fonction mintNFT avec les arguments souhaités
  const address = await mintNFTA(Collection_NumberOfNFT, Collection_Name, Collection_Symbol, metadataArray, recipientAddresses);

  try {
    const result = await db.promise().query(
      'INSERT INTO COLLECTION (Collection_Name, Collection_NumberOfNFT, Collection_Creator, Collection_Symbol,  Collection_Adress) VALUES (?, ?, ?, ?, ?)',
      [Collection_Name, Collection_NumberOfNFT, Collection_CreatorID, Collection_Symbol, address]
    );
    
    const collectionID = result[0].insertId;
    
    operationSuccessful = true; // Marquez l'opération de la table COLLECTION comme réussie

    // Si l'opération dans la table COLLECTION a réussi, insérez les NFT dans la table NFT
    for (let i = 0; i < metadataArray.length; i++) {
      const metadata = metadataArray[i];
      const NFT_OwnerID = OwnerIdArray[i];
      
      const result = await db.promise().query(
        'INSERT INTO NFT (NFT_name, NFT_metadata_json, NFT_rightID, NFT_CollectionID, NFT_OwnerID, NFT_CreatorID) VALUES (?, ?, ?, ?, ?, ?)',
        [metadata.name, JSON.stringify(metadata), metadata.rightID, collectionID, NFT_OwnerID, Collection_CreatorID]
      );
      
      const insertId = result[0].insertId;

      await db.promise().query(
        'INSERT INTO NFTRIGHT (NFTRIGHT_IDRIGHT, NFTRIGHT_IDNFT) VALUES (?, ?)',
        [metadata.rightID, insertId]
      );
      
      await db.promise().query(
        'UPDATE BENEFICIARY SET Beneficiary_NFTNumber = Beneficiary_NFTNumber + 1 WHERE Beneficiary_ID = ?',
        [NFT_OwnerID]
      );

      await db.promise().query(
        'INSERT INTO BENEFICIARYRIGHT (BeneficiaryRight_BeneficiaryID, BeneficiaryRight_RightID) VALUES (?, ?)',
        [NFT_OwnerID, metadata.rightID]
      );
    }
    
  } catch (error) {
    console.error('Error when inserting data in the COLLECTION table:', error);
  }

  if (!operationSuccessful) {
    // Si l'opération dans la table COLLECTION n'a pas réussi, renvoyez une réponse d'erreur
    return res.status(500).json({ error: 'Error when inserting data in the COLLECTION table:' });
  }

  // L'opération a réussi, renvoyez une réponse réussie
  return res.status(201).json({ message: 'Collection successfully added' });
};


/**
 * @api {get} /collection/GetAllCollection Get All Collections
 * @apiName GetAllCollection
 * @apiGroup Collection
 * @apiDescription Ce endpoint est disponible pour les administrateurs. Il permet à un administrateur d'obtenir toutes les informations de toutes les collections.
 * 
 * @apiHeader {String} x-keypub Public key of the actor.
 * @apiHeader {String} x-keyprv Private key of the actor.
 * 
 * @apiSuccess {Object[]} collection List of all collections.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *       {
 *         "Collection_ID": 1,
 *         "Collection_Name": "My Collection",
 *         "Collection_NumberOfNFT": 10,
 *         "Collection_Creator": 1,
 *         "Collection_Symbol": "MCS",
 *         "Collection_Adress": "0x1234..."
 *       },
 *       // More collections...
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
 * @apiError (500 Internal Server Error) {String} error Server error during data recovery.
 * @apiErrorExample {json} InternalServerError-Response:
 *     HTTP/1.1 500 Server error during data recovery
 *     {
 *       "error": "Server error during data recovery"
 *     }
 */

// Méthode GET pour obtenir tous les rights qui existe
const getAllCollection = async (req, res) => {
  try {
    const collection = await db.promise().query('SELECT * FROM COLLECTION');
    res.json(collection);
  } catch (error) {
    console.error('Error retrieving collections:', error);
    res.status(500).json({ error: 'Server error during data recovery' });
  }
};


/**
 * @api {get} /collection/GetAllNftByIDCollection/:id Get All NFTs by Collection ID
 * @apiName GetAllNftByIDCollection
 * @apiGroup Collection
 * @apiDescription Ce endpoint est disponible pour les créateurs, bénéficaires et les administrateurs. Il permet d'obtenir toutes les informations sur les NFTs d'une collection précise.
 * 
 * 
 * @apiHeader {String} x-keypub Public key of the actor.
 * @apiHeader {String} x-keyprv Private key of the actor.
 * @apiParam {Number} id ID of the collection.
 *
 * @apiSuccess {Object[]} NFTs List of all NFTs in the collection.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *       {
 *         "NFT_ID": 1,
 *         "NFT_name": "NFT 1",
 *         "NFT_metadata_json": {...},
 *         "NFT_rightID": 1,
 *         "NFT_CollectionID": 1,
 *         "NFT_OwnerID": 2,
 *         "NFT_CreatorID": 1
 *       },
 *       // More NFTs...
 *     ]
 * 
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
 * @apiError (404 Not Found) {String} error Collection Not Found.
 * @apiErrorExample {json} Not Found-Response :
 *     HTTP/1.1 404 Unauthorized
 *     {
 *       "error": "Collection Not Found"
 *     }
 * 
 * @apiError (500 Internal Server Error) {String} error Server error during data recovery.
 * @apiErrorExample {json} InternalServerError-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "error Server error during data recovery."
 *     }
 */

// Méthode GET pour obtenir tous les NFTs d'une collection avec vérification d'existence de la collection
const getAllNftByIDCollection = async (req, res) => {
  const id = req.params.id;

  try {
    // Vérifier si la collection existe
    const [collection] = await db.promise().query('SELECT * FROM COLLECTION WHERE Collection_ID = ?', id);

    if (collection.length === 0) {
      // Si la collection n'existe pas, renvoyer une erreur
      res.status(404).json({ error: 'Collection Not Found' });
      return;
    }

    // Si la collection existe, récupérer les NFTs associés
    const NFTs = await db.promise().query('SELECT * FROM NFT WHERE NFT_CollectionID = ?', [id]);
    res.json(NFTs[0]);
  } catch (error) {
    console.error('Error when retrieving collections or NFTs :', error);
    res.status(500).json({ error: 'Server error during data recovery' });
  }
};


module.exports = {
  getAllCollection,
  createCollection,
  getAllNftByIDCollection,
};
