const db = require('../middleware/connectDB');

// Méthode GET pour obtenir tous les créateurs
const getAllCreators = async (req, res) => {
  try {
    const creators = await db.promise().query('SELECT * FROM CREATOR');
    res.json(creators);
  } catch (error) {
    console.error('Erreur lors de la récupération des créateurs :', error);
    res.status(500).json({ error: 'Erreur serveur lors de la récupération des données' });
  }
};




// Méthode GET pour obtenir tous les nom des créateurs
const getAllCreatorName = async (req, res) => {
  try {
    const creators = await db.promise().query('SELECT Creator_name FROM CREATOR');
    res.json(creators);
  } catch (error) {
    console.error('Erreur lors de la récupération des nom de créateurs :', error);
    res.status(500).json({ error: 'Erreur serveur lors de la récupération des données' });
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
      res.status(404).json({ error: 'Créateur non trouvé' });
    }
  } catch (error) {
    console.error('Erreur lors de la récupération du nom du créateur :', error);
    res.status(500).json({ error: 'Erreur serveur lors de la récupération des données' });
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

    res.status(201).json({ message: 'Créateur ajouté avec succès', id: result.insertId });
  } catch (error) {
    console.error('Erreur lors de la création du créateur :', error);
    res.status(500).json({ error: 'Erreur serveur lors de la création du créateur' });
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
        res.status(200).json({ message: 'Créateur mis à jour avec succès', id: creatorId });
      } else {
        res.status(404).json({ error: 'Créateur non trouvé' });
      }
    } else {
      res.status(500).json({ error: 'Erreur serveur lors de la mise à jour du créateur' });
    }
  } catch (error) {
    console.error('Erreur lors de la mise à jour du créateur :', error);
    res.status(500).json({ error: 'Erreur serveur lors de la mise à jour du créateur' });
  }
};




// Méthode PUT pour mettre à jour les crédits d'un créateur
const updateCCreator = async (req, res) => {
  const {Creator_C_add} = req.body;
  const creatorId = req.params.id;

  const [nb] = await db.promise().query('SELECT CREATOR_C FROM CREATOR WHERE Creator_ID = ?', [creatorId]);
  const a = nb[0].CREATOR_C + Creator_C_add;
 // Supposons que vous obtenez l'ID du créateur à partir de la route
  try {

    const results = await db.promise().query(
      'UPDATE CREATOR SET CREATOR_C = ? WHERE Creator_ID = ?',
      [a, creatorId]
    );
    console.log(results);

    if (results[0] && results[0].affectedRows !== undefined) {
      if (results[0].affectedRows > 0) {
        res.status(200).json({ message: 'Créateur mis à jour avec succès', id: creatorId });
      } else {
        res.status(404).json({ error: 'Créateur non trouvé' });
      }
    } else {
      res.status(500).json({ error: 'Erreur serveur lors de la mise à jour du créateur' });
    }
  } catch (error) {
    console.error('Erreur lors de la mise à jour du créateur :', error);
    res.status(500).json({ error: 'Erreur serveur lors de la mise à jour du créateur' });
  }
};

module.exports = {
  getAllCreators,
  getOneCreatorNameByID,
  createCreator,
  updateNameCreator,
  updateCCreator,
  getAllCreatorName,
};