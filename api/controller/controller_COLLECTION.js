const db = require('../middleware/connectDB');
const { mintNFTA } = require('./mint-collection');

const createCollection = async (req, res) => {
  const { Collection_NumberOfNFT, Collection_Name, Collection_Symbol, metadataArray, recipientAddresses, Collection_Creator} = req.body;

  // Utilisez une variable pour suivre l'état de l'opération
  let operationSuccessful = false;

  // Appelez la fonction mintNFT avec les arguments souhaités
  await mintNFTA(Collection_NumberOfNFT, Collection_Name, Collection_Symbol, metadataArray, recipientAddresses);

  try {
    const result = await db.promise().query(
      'INSERT INTO COLLECTION (Collection_Name, Collection_NumberOfNFT, Collection_Creator, Collection_Symbol) VALUES (?, ?, ?, ?)',
      [Collection_Name, Collection_NumberOfNFT, Collection_Creator, Collection_Symbol]
    );
    
    const collectionID = result[0].insertId;
    
    operationSuccessful = true; // Marquez l'opération de la table COLLECTION comme réussie

    // Si l'opération dans la table COLLECTION a réussi, insérez les NFT dans la table NFT
    for (const metadata of metadataArray) {
      await db.promise().query(
        'INSERT INTO NFT (NFT_name, NFT_metadata_json, NFT_rightID, NFT_CollectionID) VALUES (?, ?, ?, ?)',
        [metadata.name, JSON.stringify(metadata), metadata.rightID, collectionID]
      );
    }
  } catch (error) {
    console.error('Erreur lors de l\'insertion des données dans la table COLLECTION :', error);
  }

  if (!operationSuccessful) {
    // Si l'opération dans la table COLLECTION n'a pas réussi, renvoyez une réponse d'erreur
    return res.status(500).json({ error: 'Erreur lors de l\'insertion des données dans la table COLLECTION' });
  }

  // L'opération a réussi, renvoyez une réponse réussie
  return res.status(201).json({ message: 'Collection ajoutée avec succès' });
};
module.exports = {
  createCollection,
};
