const db = require('../middleware/connectDB');

// Méthode GET pour obtenir tous les BeneficiaryRight_RightID à partir du BeneficiaryRight_BeneficiaryID
const getRightsByBeneficiaryID = async (req, res) => {
  const BeneficiaryID = req.params.id; // L'ID du bénéficiaire est extrait des paramètres de l'URL

  try {
    const [rows] = await db.promise().query('SELECT BeneficiaryRight_RightID FROM BENEFICIARYRIGHT WHERE BeneficiaryRight_BeneficiaryID = ?', BeneficiaryID);

    // Vérifiez si des résultats ont été trouvés
    if (rows.length > 0) {
      const rights = rows.map((row) => row.BeneficiaryRight_RightID);
      res.json({ BeneficiaryRight_RightID: rights });
    } else {
      res.status(404).json({ error: 'Aucun droit de bénéficiaire trouvé pour cet ID de bénéficiaire' });
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des BeneficiaryRight_RightID :', error);
    res.status(500).json({ error: 'Erreur serveur lors de la récupération des BeneficiaryRight_RightID' });
  }
};

module.exports = {
  getRightsByBeneficiaryID,
};
