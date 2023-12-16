const db = require('./connectDB');

// Middleware pour vérifier la clé publique (Creator_keypub) et privée (Creator_keyprv)
const checkKeyPairC = async (req, res, next) => {
  const keypub = req.headers['x-keypub']; // Récupérez la clé publique à partir des en-têtes
  const keyprv = req.headers['x-keyprv']; // Récupérez la clé privée à partir des en-têtes
  const actor = req.headers['x-actor'];
  if (!keypub || !keyprv) {
    return res.status(401).json({ error: 'Public or private key missing' });
  }
  
  if (actor != 'CREATOR') {
    return res.status(401).json({error : 'bad actor'})
  }

  try {
    // Exécutez la requête SQL pour vérifier si la paire de clés existe dans la base de données
    const [rows] = await db.promise().query('SELECT Creator_ID FROM CREATOR WHERE Creator_keypub = ? AND Creator_keyprv = ?', [keypub, keyprv]);
    console.log(rows);

    if (rows.length === 1) {
      // Si la paire de clés est valide, ajoutez le Creator_ID à la demande pour une utilisation ultérieure
      req.creatorId = rows[0].Creator_ID;
      next(); // Passez au middleware suivant ou à la route
    } else {
      res.status(401).json({ error: 'Invalid key pair' });
    }
  } catch (error) {
    console.error('Error when checking the key pair :', error);
    res.status(500).json({ error: 'Server error checking the key pair' });
  }
};

module.exports = {
  checkKeyPairC,
};