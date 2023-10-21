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

module.exports = {
  createBeneficiary,
  getETHAdressFromID,
};