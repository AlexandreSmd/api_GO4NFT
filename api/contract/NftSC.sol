//Contract based on [https://docs.openzeppelin.com/contracts/3.x/erc721](https://docs.openzeppelin.com/contracts/3.x/erc721)
//Commentaire qui indique que ce contrat est basé sur la spécification ERC-721 d'OpenZeppelin. 
//Il fournit également un lien vers la documentation OpenZeppelin pour ERC-721.

// SPDX-License-Identifier: MIT
//Cette ligne indique la licence sous laquelle ce contrat est publié.

pragma solidity ^0.8.9;
//Version minimale de Solidity requise pour compiler ce contra

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract NftSC is ERC721URIStorage, Ownable {

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    //Ces lignes déclarent une variable privée _tokenIds de type Counters.Counter et utilisent la bibliothèque Counters d'OpenZeppelin
    //pour gérer les compteurs. Cette variable sera utilisée pour attribuer un identifiant unique à chaque jeton NFT créé.

    string private _nftSymbol;
    string private _nftName;
    
    constructor(string memory nftName, string memory nftSymbol) ERC721(nftName, nftSymbol) {
        _nftSymbol = nftSymbol;    
        _nftName = nftName;
        }
    //Le constructeur de ce contrat est défini ici. Il hérite le constructeur de la classe parente ERC721 et initialise le nom et 
    //le symbole du jeton en tant que "MyNFT" et "NFT" respectivement.

    //Cette fonction mintNFT permet au propriétaire du contrat de créer un nouveau NFT en spécifiant l'adresse du destinataire et 
    //l'URI du jeton. Elle incrémente le compteur d'identifiants, crée un nouveau jeton NFT avec cet identifiant, attribue l'URI au 
    //jeton, puis retourne l'identifiant du nouveau jeton NFT créé.
    
    function mintNFT(address recipient, string memory tokenURI)
        public onlyOwner
        returns (uint256)
    {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);

        return newItemId;
    }
}
