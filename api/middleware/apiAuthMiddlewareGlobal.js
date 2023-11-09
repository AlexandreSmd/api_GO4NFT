const db = require('./connectDB');

// Fonction pour vérifier la validité d'une paire de clés
const checkKeyPairG = async (req, res, next) => {
  const keypub = req.headers['x-keypub']; // Récupérez la clé publique à partir des en-têtes
  const keyprv = req.headers['x-keyprv']; // Récupérez la clé privée à partir des en-têtes

  if (!keypub || !keyprv) {
    return res.status(401).json({ error: 'Clé publique ou privée manquante' });
  }

  // Récupérez le type d'acteur
  const actor = req.headers['x-actor'];

  // Exécutez la requête SQL pour vérifier si la paire de clés existe dans la base de données
  const [rows] = await db.promise().query(`
    SELECT ${actor}_ID
    FROM ${actor}
    WHERE ${actor}_keypub = ? AND ${actor}_keyprv = ?
  `, [keypub, keyprv]);

  // Si la paire de clés existe, ajoutez l'ID de l'acteur à la demande
  if (rows.length === 1) {
    req[actor + 'Id'] = rows[0][actor + '_ID'];
    next(); // Passez au middleware suivant ou à la route
  } else {
    res.status(401).json({ error: 'Paire de clés invalide' });
  }
};

module.exports = {
  checkKeyPairG,
};
