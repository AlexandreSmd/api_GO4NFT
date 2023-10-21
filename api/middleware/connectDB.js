const mysql = require('mysql2');

// Configuration de la connexion à la base de données
const db = mysql.createConnection({
  host: 'localhost', // Adresse du serveur MySQL
  user: 'alexandre_smd', // Nom d'utilisateur MySQL
  password: '4DdnCLABG32', // Mot de passe MySQL
  database: 'DatabaseAPI', // Nom de votre base de données
});

// Établir la connexion à la base de données
db.connect(err => {
  if (err) {
    console.error('Erreur de connexion à la base de données : ' + err.stack);
    return;
  }
  console.log('Connecté à la base de données MySQL');
});

module.exports = db;