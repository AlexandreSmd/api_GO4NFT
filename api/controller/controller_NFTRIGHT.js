const db = require('../middleware/connectDB');

/**
 * @api {post} /nftrights/Create Create NFT Right
 * @apiName CreateNFTRight
 * @apiGroup NFTRight
 * @apiDescription Ce endpoint est disponible pour les créateurs.
 * 
 * @apiHeader {String} x-keypub Public key of the actor.
 * @apiHeader {String} x-keyprv Private key of the actor.
 *
 * @apiParam {Number} NFTRIGHT_IDNFT ID of the associated NFT.
 * @apiParam {Number} NFTRIGHT_IDRIGHT ID of the associated right.
 *
 * @apiParamExample {javascript} Request-Example:
 * 
 * const axios = require('axios');

const baseURL = 'http://92.222.172.127:3000/api';

// Clé publique et privée valide pour les tests (remplacez-les par vos clés réelles si nécessaire)
const keypub = '123';
const keyprv = '123';

// Fonction de test pour créer un nouveau "Right"
async function testCreateLinkRightNFT() {
  try {
    const newLink = {
      NFTRIGHT_IDNFT : 1,
      NFTRIGHT_IDRIGHT : 2,
    };

    const response = await axios.post(`${baseURL}/nft/LinkRightToNFT`, newLink, {
      headers: {
        'x-actor' : 'CREATOR',
        'x-keypub': keypub,
        'x-keyprv': keyprv,
      },
    });

    console.log('Résultat de la requête POST /nft/LinkRightToNFT :');
    console.log(response.data);
  } catch (error) {
    console.error('Erreur lors de la requête POST /nft/LinkRightToNFT :', error);
  }
}

// Exécutez la fonction de test pour créer un nouveau lien entre un right et un NFT
testCreateLinkRightNFT();

 * 
 * 
 * @apiSuccess {String} message Success message.
 * @apiSuccess {Number} id ID of the created NFT right.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 201 OK
 *     {
 *       "message": "NFT right successfully added",
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
 * @apiError (403 Unauthorized) {String} error You are not the creator of this NFT.
 * @apiErrorExample {json} Unauthorized-Response 3:
 *     HTTP/1.1 403 Unauthorized
 *     {
 *       "error": "You are not the creator of this NFT"
 *     }
 * 
 * @apiError (404 Not Found) {String} error NFT not found.
 * @apiErrorExample {json} Not Found-Response :
 *     HTTP/1.1 404 Unauthorized
 *     {
 *       "error": "NFT not found"
 *     }
 * 
 * @apiError (500 Internal Server Error) {String} error Server Error Creating NFT right.
 * @apiErrorExample {json} InternalServerError-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Server Error Creating NFT right"
 *     }
 */


const createNFTRight = async (req, res) => {
  const { NFTRIGHT_IDNFT, NFTRIGHT_IDRIGHT } = req.body;
  const { 'x-keypub': keypub, 'x-keyprv': keyprv } = req.headers;

  try {
    // 1. Récupérez le Creator_ID associé à la clé publique et privée
    const [creatorResult] = await db.promise().query('SELECT Creator_ID FROM CREATOR WHERE Creator_keypub = ? AND Creator_keyprv = ?', [keypub, keyprv]);

    if (creatorResult.length === 0) {
      return res.status(401).json({ error: 'Invalid public or private key' });
    }

    const creatorID = creatorResult[0].Creator_ID;

    // 2. Récupérez le NFT_CreatorID associé à NFTRIGHT_IDNFT (NFT_ID)
    const [nftResult] = await db.promise().query('SELECT NFT_CreatorID FROM NFT WHERE NFT_ID = ?', [NFTRIGHT_IDNFT]);

    if (nftResult.length === 0) {
      return res.status(404).json({ error: 'NFT not found' });
    }

    const nftCreatorID = nftResult[0].NFT_CreatorID;

    // 3. Comparez Creator_ID et NFT_CreatorID
    if (creatorID !== nftCreatorID) {
      return res.status(403).json({ error: 'You are not the creator of this NFT' });
    }

    // Insertion du NFTRIGHT si la vérification est réussie
    const result = await db.promise().query(
      'INSERT INTO NFTRIGHT (NFTRIGHT_IDNFT, NFTRIGHT_IDRIGHT) VALUES (?, ?)',
      [NFTRIGHT_IDNFT, NFTRIGHT_IDRIGHT]
    );

    res.status(201).json({ message: 'NFT right successfully added', id: result.insertId });
  } catch (error) {
    console.error(' Error Creating NFT right:', error);
    res.status(500).json({ error: 'Server Error Creating NFT right' });
  }
};




module.exports = {
  createNFTRight,
};
