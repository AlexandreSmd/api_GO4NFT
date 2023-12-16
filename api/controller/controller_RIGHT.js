const db = require('../middleware/connectDB');

// Méthode POST pour créer un RIGHT
const createRight = async (req, res) => {
  const {Right_Name} = req.body; // Les données sont extraites du corps de la requête

  try {
    const result = await db.promise().query(
      'INSERT INTO rights (Right_Name) VALUES (?)',
      [Right_Name]
    );

    res.status(201).json({ message: 'Right successfully added', id: result.insertId });
  } catch (error) {
    console.error('Error when creating the right :', error);
    res.status(500).json({ error: 'Server Error when creating the right' });
  }
};


// Méthode GET pour obtenir tous les rights qui existe
const getAllRights = async (req, res) => {
  try {
    const rights = await db.promise().query('SELECT * FROM rights');
    res.json(rights);
  } catch (error) {
    console.error('Error while retrieving rights :', error);
    res.status(500).json({ error: 'Server Error' });
  }
};

module.exports = {
  createRight,
  getAllRights
};