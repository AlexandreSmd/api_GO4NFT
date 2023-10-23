const db = require('../middleware/connectDB');

const createNFTRight = async (req, res) => {
  const { NFTRIGHT_IDNFT, NFTRIGHT_IDRIGHT } = req.body; // Les données sont extraites du corps de la requête

  try {
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
