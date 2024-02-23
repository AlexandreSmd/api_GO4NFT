# API GO4NFT - Alexandre Simaillaud

## Project goal

Create a REST API facilitating the deployment of ERC-721-type smart contracts and the mint of NFTs on Ethereum and its compatible 2 EVM layers (Rollup, ZKSync and Polygon ZKevm).

## Stack

- **Langages**: Javascript, HTML, CSS
- **Framework**: ExpressJs
- **Smart Contracts**: Solidity, Hardhat
- **Web3**: Web3.js, Ether.js
- **Blockchain Providers**: Alchemy, MetaMask
- **Storage**: Pinata
- **Database**: MySQL
- **Server**: Apache2
- **Operating System**: Linux (Ubuntu)
- **Version control**: Git


## What I did

- Creation of an API with 19 routes associated with different methods.
- Authentication system using a public and a private key. Three types of actors can make different requests, hence the need for an authentication system.
- Error handling at API level.
- API documentation generated with apidoc.
- Javascript frontend.
- Integration of MetaMask in the frontend.
- Deploying the API on an Apache2 server.
- Use of express-rate-limit to prevent DDoS attacks.

## Usage

- **Server Status**: The server is currently closed, and the API is not operational.

- **Local Setup**:
  - To reuse or run the API locally, you need MySQL installed.
  - Execute all .sql files to create the necessary SQL tables for the API.
  - Install Node.js version v20.8.0.
  - Run `npm install` to install all project dependencies.
  - Launch the API using the command `node app.js`.

- **Testing Methods**:
  - Utilize the test files available in the `api/testapi` directory to test various methods of the project.

Please note that due to the server being closed, the API is not currently usable. The provided instructions are for reference in case you want to use or run the API locally.
