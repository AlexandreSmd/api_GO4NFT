const db = require('../middleware/connectDB');

// Méthode POST pour créer un RIGHT
const createRight = async (req, res) => {
  const {Right_Name} = req.body; // Les données sont extraites du corps de la requête

  try {
    const result = await db.promise().query(
      'INSERT INTO rights (Right_Name) VALUES (?)',
      [Right_Name]
    );

    res.status(201).json({ message: 'Right ajouté avec succès', id: result.insertId });
  } catch (error) {
    console.error('Erreur lors de la création du Right :', error);
    res.status(500).json({ error: 'Erreur serveur lors de la création du Right' });
  }
};

module.exports = {
  createRight,
};