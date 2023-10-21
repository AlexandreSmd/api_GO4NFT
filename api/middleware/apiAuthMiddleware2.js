const db = require('./connectDB');

// Middleware pour vérifier la clé publique (Creator_keypub) et privée (Creator_keyprv)
const checkKeyPair2 = async (req, res, next) => {
  const keypub = req.headers['x-keypub']; // Récupérez la clé publique à partir des en-têtes
  const keyprv = req.headers['x-keyprv']; // Récupérez la clé privée à partir des en-têtes

  if (!keypub || !keyprv) {
    return res.status(401).json({ error: 'Clé publique ou privée manquante' });
  }

  try {
    // Exécutez la requête SQL pour vérifier si la paire de clés existe dans la base de données
    const [rows] = await db.promise().query('SELECT Administrator_ID FROM ADMINISTRATOR WHERE Administrator_keypub = ? AND Administrator_keyprv = ?', [keypub, keyprv]);
    console.log(rows);

    if (rows.length === 1) {
      // Si la paire de clés est valide, ajoutez le Creator_ID à la demande pour une utilisation ultérieure
      req.AdministratorId = rows[0].Administrator_ID;
      next(); // Passez au middleware suivant ou à la route
    } else {
      res.status(401).json({ error: 'Paire de clés invalide' });
    }
  } catch (error) {
    console.error('Erreur lors de la vérification de la paire de clés :', error);
    res.status(500).json({ error: 'Erreur serveur lors de la vérification de la paire de clés' });
  }
};

module.exports = {
  checkKeyPair2,
};