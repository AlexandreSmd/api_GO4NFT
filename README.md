# API GO4NFT - Alexandre Simaillaud #

### Objectif du projet ###

Créer une API REST pour faciliter le déploiement de smart contract de type ERC-721 et le mint d'NFTs sur Ethereum et ses layers 2 EVM compatible (scroll, ZKSync et Polygon ZKevm).

### Stack ###

Javascript, HTML, CSS, ExpressJs
Solidity, Hardhat, Web3.js, Ether.js, Alchemy, Pinata, MetaMask
MySQL, Apache2

### Qu'est qui a été fait ? ###

Création d'une API (19 routes associés à différentes méthodes)
Système d'authentification avec clé publique et clé privée (trois types d'acteurs différents peuvent faire des requêtes différentes, il y a donc un système d'authentification car les acteurs n'ont pas accès au même méthodes)
Système d'erreur API
Documentation API généré avec apidoc
Frontend en Javascript
Intégration de MetaMask au frontend
Déploiement de l'API sur serveur apache2
Utilisation de express-rate-limit pour éviter les attaques DDoS
