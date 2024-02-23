# API GO4NFT - Alexandre Simaillaud

## Objectif du projet

Créer une API REST facilitant le déploiement de smart contracts de type ERC-721 et le mint d'NFTs sur Ethereum et ses layers 2 EVM compatibles (Rollup, ZKSync et Polygon ZKevm).

## Stack

- **Langages**: Javascript, HTML, CSS
- **Framework**: ExpressJs
- **Smart Contracts**: Solidity, Hardhat
- **Web3**: Web3.js, Ether.js
- **Blockchain Providers**: Alchemy, MetaMask
- **Storage**: Pinata
- **Database**: MySQL
- **Server**: Apache2

## Ce qui a été réalisé

- Création d'une API avec 19 routes associées à différentes méthodes.
- Système d'authentification utilisant une clé publique et une clé privée. Trois types d'acteurs peuvent effectuer des requêtes différentes, d'où la nécessité d'un système d'authentification.
- Gestion des erreurs au niveau de l'API.
- Documentation de l'API générée avec apidoc.
- Frontend en Javascript.
- Intégration de MetaMask dans le frontend.
- Déploiement de l'API sur un serveur Apache2.
- Utilisation de express-rate-limit pour prévenir les attaques DDoS.

