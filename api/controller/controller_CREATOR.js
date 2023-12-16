const db = require('../middleware/connectDB');

// Méthode GET pour obtenir tous les créateurs
const getAllCreators = async (req, res) => {
  try {
    const creators = await db.promise().query('SELECT * FROM CREATOR');
    res.json(creators);
  } catch (error) {
    console.error('Error when retrieving creators :', error);
    res.status(500).json({ error: 'Server error during data recovery' });
  }
};




// Méthode GET pour obtenir tous les nom des créateurs
const getAllCreatorName = async (req, res) => {
  try {
    const creators = await db.promise().query('SELECT Creator_name FROM CREATOR');
    res.json(creators);
  } catch (error) {
    console.error('Error retrieving creator names :', error);
    res.status(500).json({ error: 'Server error during data recovery' });
  }
};


// Méthode GET pour obtenir un créateur par son ID
const getOneCreatorNameByID = async (req, res) => {
  const creatorId = req.params.id; // L'ID est extrait des paramètres de l'URL

  try {
    const [rows] = await db.promise().query('SELECT Creator_Name FROM CREATOR WHERE Creator_ID = ?', creatorId);

    // Vérifiez si des résultats ont été trouvés
    if (rows.length === 1) {
      const creatorName = rows[0].Creator_Name;
      res.json({ Creator_Name: creatorName });
    } else {
      res.status(404).json({ error: 'Creator not found' });
    }
  } catch (error) {
    console.error('Error retrieving creator name :', error);
    res.status(500).json({ error: 'Server error during data recovery' });
  }
};


// Méthode POST pour créer un créateur
const createCreator = async (req, res) => {
  const { Creator_Name, Creator_keypub, Creator_keyprv} = req.body; // Les données sont extraites du corps de la requête

  try {
    const result = await db.promise().query(
      'INSERT INTO CREATOR (Creator_Name, Creator_keypub, Creator_keyprv) VALUES (?, ?, ?)',
      [Creator_Name, Creator_keypub, Creator_keyprv]
    );

    res.status(201).json({ message: 'Creator successfully added', id: result.insertId });
  } catch (error) {
    console.error('Error when creating the creator :', error);
    res.status(500).json({ error: 'Server error when creating the creator' });
  }
};

// Méthode PUT pour mettre à jour un créateur
const updateNameCreator = async (req, res) => {
  const { Creator_Name} = req.body;
  const creatorId = req.params.id; // Supposons que vous obtenez l'ID du créateur à partir de la route
  try {
    const results = await db.promise().query(
      'UPDATE CREATOR SET Creator_Name = ? WHERE Creator_ID = ?',
      [Creator_Name, creatorId]
    );


    if (results[0] && results[0].affectedRows !== undefined) {
      if (results[0].affectedRows > 0) {
        res.status(200).json({ message: 'Creator updated successfully', id: creatorId });
      } else {
        res.status(404).json({ error: 'Creator not found' });
      }
    } else {Erreur
      res.status(500).json({ error: 'Server error updating creator' });
    }
  } catch (error) {
    console.error('Error updating creator :', error);
    res.status(500).json({ error: 'EServer error updating creator' });
  }
};


// Méthode PUT pour mettre à jour les crédits d'un créateur
const updateCCreator = async (req, res) => {
  const { Creator_C_add } = req.body;
  const creatorId = req.params.id;

  // Vérifier si le créateur existe
  const [creator] = await db.promise().query('SELECT * FROM CREATOR WHERE Creator_ID = ?', [creatorId]);

  if (!creator || creator.length === 0) {
    return res.status(404).json({ error: 'Créateur inexistant' });
  }

  const currentCCreator = creator[0].CREATOR_C;
  const newCCreator = currentCCreator + Creator_C_add;

  try {
    const results = await db.promise().query(
      'UPDATE CREATOR SET CREATOR_C = ? WHERE Creator_ID = ?',
      [newCCreator, creatorId]
    );

    console.log(results);

    if (results[0] && results[0].affectedRows !== undefined) {
      if (results[0].affectedRows > 0) {
        res.status(200).json({ message: 'Creator updated successfully', id: creatorId });
      } else {
        res.status(404).json({ error: 'Creator not found' });
      }
    } else {
      res.status(500).json({ error: 'Server error updating creator' });
    }
  } catch (error) {
    console.error('Error updating creator :', error);
    res.status(500).json({ error: 'Server error updating creator' });
  }
};

// Méthode GET pour voir si un créateur existe.
const ifCreatorExist = async (req, res) => {
  try {
      const creatorId = req.params.id;
      const [creator] = await db.promise().query('SELECT * FROM CREATOR WHERE Creator_ID = ?', [creatorId]);

      if (!creator || creator.length === 0) {
          res.status(404).json({ exists: false });
      } else {
          res.status(200).json({ exists: true });
      }
  } catch (error) {
      console.error('Error retrieving creator names :', error);
      res.status(500).json({ error: 'Server Error Retrieving Data' });
  }
};


const getCCreator = async (req, res) => {
  try {
    const creatorId = req.params.id;
    const creators = await db.promise().query('SELECT CREATOR_C FROM CREATOR WHERE Creator_ID = ?', [creatorId]);
    res.json(creators[0]);
  } catch (error) {
    console.error('Error retrieving creator C :', error);
    res.status(500).json({ error: 'Server error during data recovery' });
  }
};




module.exports = {
  getAllCreators,
  getOneCreatorNameByID,
  createCreator,
  updateNameCreator,
  updateCCreator,
  getAllCreatorName,
  ifCreatorExist,
  getCCreator
};