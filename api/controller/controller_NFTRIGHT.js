const db = require('../middleware/connectDB');

/**
 * @api {post} /nftrights/Create Create NFT Right
 * @apiName CreateNFTRight
 * @apiGroup NFTRight
 *
 * @apiHeader {String} x-keypub Creator's public key.
 * @apiHeader {String} x-keyprv Creator's private key.
 *
 * @apiParam {Number} NFTRIGHT_IDNFT ID of the associated NFT.
 * @apiParam {Number} NFTRIGHT_IDRIGHT ID of the associated right.
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
 * @apiError (401 Unauthorized) {String} error Invalid public or private key.
 * @apiError (403 Forbidden) {String} error You are not the creator of this NFT.
 * @apiError (404 Not Found) {String} error NFT not found.
 * @apiError (500 Internal Server Error) {String} error Server Error Creating NFT right.
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
