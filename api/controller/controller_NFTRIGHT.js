const db = require('../middleware/connectDB');

const createNFTRight = async (req, res) => {
  const { NFTRIGHT_IDNFT, NFTRIGHT_IDRIGHT } = req.body;
  const { 'x-keypub': keypub, 'x-keyprv': keyprv } = req.headers;

  try {
    // 1. Récupérez le Creator_ID associé à la clé publique et privée
    const [creatorResult] = await db.promise().query('SELECT Creator_ID FROM CREATOR WHERE Creator_keypub = ? AND Creator_keyprv = ?', [keypub, keyprv]);

    if (creatorResult.length === 0) {
      return res.status(401).json({ error: 'Clé publique ou privée invalide' });
    }

    const creatorID = creatorResult[0].Creator_ID;

    // 2. Récupérez le NFT_CreatorID associé à NFTRIGHT_IDNFT (NFT_ID)
    const [nftResult] = await db.promise().query('SELECT NFT_CreatorID FROM NFT WHERE NFT_ID = ?', [NFTRIGHT_IDNFT]);

    if (nftResult.length === 0) {
      return res.status(404).json({ error: 'NFT non trouvé' });
    }

    const nftCreatorID = nftResult[0].NFT_CreatorID;

    // 3. Comparez Creator_ID et NFT_CreatorID
    if (creatorID !== nftCreatorID) {
      return res.status(403).json({ error: 'Vous n\'êtes pas le créateur de ce NFT' });
    }

    // Insertion du NFTRIGHT si la vérification est réussie
    const result = await db.promise().query(
      'INSERT INTO NFTRIGHT (NFTRIGHT_IDNFT, NFTRIGHT_IDRIGHT) VALUES (?, ?)',
      [NFTRIGHT_IDNFT, NFTRIGHT_IDRIGHT]
    );

    res.status(201).json({ message: 'Droit NFT ajouté avec succès', id: result.insertId });
  } catch (error) {
    console.error('Erreur lors de la création du droit NFT :', error);
    res.status(500).json({ error: 'Erreur serveur lors de la création du droit NFT' });
  }
};




module.exports = {
  createNFTRight,
};
