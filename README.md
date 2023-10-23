# api_nft

Pour lancer l'API, il faut faire
node app.js

Pour tester mes différentes méthodes, il faut faire
cd api/testAPI
node testCreateCollection.js par ex

# les erreurs
200 OK : La requête a été traitée avec succès.
201 Created : Une nouvelle ressource a été créée avec succès.
204 No Content : La requête a été traitée avec succès, mais aucune donnée n'est renvoyée en réponse.

301 Moved Permanently : La ressource demandée a été déplacée de manière permanente vers une nouvelle URL.
302 Found (ou 303 See Other) : La ressource demandée se trouve temporairement à une autre URL.

400 Bad Request : La requête est mal formulée.
401 Unauthorized : L'accès à la ressource nécessite une authentification ou une autorisation.
403 Forbidden : Le client n'est pas autorisé à accéder à la ressource.
404 Not Found : La ressource demandée n'a pas été trouvée sur le serveur.

500 Internal Server Error : Une erreur interne du serveur s'est produite.
502 Bad Gateway : Le serveur agit comme une passerelle ou un proxy et a reçu une réponse incorrecte d'un serveur en amont.
503 Service Unavailable : Le serveur n'est pas disponible pour le moment (en maintenance, surchargé, etc.).

# Mes différentes méthodes selon si tu es Administrator, Creator ou Beneficiary

Administrator : 
POST : Créer un créator
POST : Créer un beneficiary

Creator : 
GET : Obtenir un créateur par son ID
GET : Obtenir tous les créateurs
GET : Obtenir l'adresse ETH à partir de l'ID du beneficiare
POST : Créer une collection NFT et minter n NFT à certaines adresse, avec des metadata et des rights
POST : créer un right
UPDATE : mettre à jour un nom de creator  

Beneficiary : 
Lire tt les rights qu'on a en tant que Beneficiaire




ROAD MAP 
-coder une méthode pour ajouter un nouveau right à un NFT en tant que créator et donc associé chaque NFT et chaque Owner de NFT à ce nouveau right