require('dotenv').config();
const { ethers } = require("hardhat");


async function deployNftSC(p1, p2) {
  try {
    // Obtenir la fabrique du contrat NftSC
    const NftSCFactory = await ethers.getContractFactory("NftSC");

    // Déployer le contrat NftSC avec les paramètres p1 et p2
    const contract = await NftSCFactory.deploy(p1, p2);
    await contract.deployed();

    console.log(`Contrat NftSC déployé à l'adresse : ${contract.address}`);
    return contract;
  } catch (error) {
    console.error("Erreur lors du déploiement du contrat NftSC :", error.message);
    return null;
  }
}

async function mintNFTA(n, p1, p2, metadataArray, recipientAddresses) {

  if (metadataArray.length !== n || recipientAddresses.length !== n) {
    console.error("Le nombre de métadonnées et d'adresses destinataires doit être égal à n.");
    return;
  }

  // Déployer un seul contrat NftSC avec les paramètres p1 et p2
  const contract = await deployNftSC(p1, p2);
  
  if (!contract) {
    console.error("Impossible de continuer avec un contrat non déployé.");
    return;
  }

  // Minter les NFT avec les métadonnées fournies sur le contrat déployé
  for (let i = 0; i < n; i++) {
    const metadata = metadataArray[i];
    const recipient = recipientAddresses[i];

    try {
      // Appeler la fonction mintNFT du contrat
      const tx = await contract.mintNFT(recipient, metadata);

      // Attendre que la transaction soit confirmée
      await tx.wait();

      console.log(`NFT minté avec les métadonnées suivantes :`);
      console.log(metadata);
    } catch (error) {
      console.error("Erreur lors de la création du NFT :", error.message);
    }
  }
}

// Exemple d'utilisation :
module.exports = {
  mintNFTA, // Exportez la fonction mintNFT
};