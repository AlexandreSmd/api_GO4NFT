const db = require('../middleware/connectDB');

// Méthode POST pour créer un créateur
const createBeneficiary = async (req, res) => {
  const { Beneficiary_Name, Beneficiary_keypub, Beneficiary_keyprv, Beneficiary_ETHAdress } = req.body; // Les données sont extraites du corps de la requête

  try {
    const result = await db.promise().query(
      'INSERT INTO BENEFICIARY (Beneficiary_Name, Beneficiary_keypub, Beneficiary_keyprv, Beneficiary_ETHAdress) VALUES (?, ?, ?, ?)',
      [Beneficiary_Name, Beneficiary_keypub, Beneficiary_keyprv, Beneficiary_ETHAdress]
    );

    res.status(201).json({ message: 'Bénéficiaire ajouté avec succès', id: result.insertId });
  } catch (error) {
    console.error('Erreur lors de la création du bénéficiaire :', error);
    res.status(500).json({ error: 'Erreur serveur lors de la création du bénéficiaire' });
  }
};

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
      res.status(404).json({ error: 'Bénéficiaire non trouvé' });
    }
  } catch (error) {
    console.error('Erreur lors de la récupération de l adress eth du befeniciaire :', error);
    res.status(500).json({ error: 'Erreur serveur lors de la récupération de l adress eth du befeniciaire' });
  }
};



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
        res.status(200).json({ message: 'Adress eth du beneficiaire mis à jour avec succès', id: creatorId });
      } else {
        res.status(404).json({ error: 'Beneficaire non trouvé' });
      }
    } else {
      res.status(500).json({ error: 'Erreur serveur lors de la mise à jour du beneficiaire' });
    }
  } catch (error) {
    console.error('Erreur lors de la mise à jour du bénéficaire :', error);
    res.status(500).json({ error: 'Erreur serveur lors de la mise à jour du bénéficaire' });
  }
};

module.exports = {
  createBeneficiary,
  getETHAdressFromID,
  updateEthAdress,
};