const db = require('../middleware/connectDB');

// Méthode POST pour créer un créateur
const createBeneficiary = async (req, res) => {
  const { Beneficiary_Name, Beneficiary_keypub, Beneficiary_keyprv, Beneficiary_ETHAdress } = req.body; // Les données sont extraites du corps de la requête

  try {
    const result = await db.promise().query(
      'INSERT INTO BENEFICIARY (Beneficiary_Name, Beneficiary_keypub, Beneficiary_keyprv, Beneficiary_ETHAdress) VALUES (?, ?, ?, ?)',
      [Beneficiary_Name, Beneficiary_keypub, Beneficiary_keyprv, Beneficiary_ETHAdress]
    );

    res.status(201).json({ message: 'Beneficiary successfully added', id: result.insertId });
  } catch (error) {
    console.error('Error when creating beneficiary :', error);
    res.status(500).json({ error: 'Server error when creating a beneficiary' });
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
      res.status(404).json({ error: 'Beneficiary not found' });
    }
  } catch (error) {
    console.error('Error when retrieving the beneficiary s ethereum address:', error);
    res.status(500).json({ error: 'Server error when retrieving the beneficiary s ethereum address' });
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
        res.status(200).json({ message: 'Beneficiary s eth address successfully updated', id: creatorId });
      } else {
        res.status(404).json({ error: 'Beneficiary not found' });
      }
    } else {
      res.status(500).json({ error: 'Server error when updating beneficiary' });
    }
  } catch (error) {
    console.error('Error updating the beneficiary :', error);
    res.status(500).json({ error: 'Server error when updating the beneficiary' });
  }
};


// Méthode GET pour obtenir tous les créateurs
const getAllBeneficiary = async (req, res) => {
  try {
    const creators = await db.promise().query('SELECT * FROM BENEFICIARY');
    res.json(creators);
  } catch (error) {
    console.error('Error when retrieving beneficiaries :', error);
    res.status(500).json({ error: 'Server error during data recovery' });
  }
};



module.exports = {
  createBeneficiary,
  getETHAdressFromID,
  updateEthAdress,
  getAllBeneficiary,
};