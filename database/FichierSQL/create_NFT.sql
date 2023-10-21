USE DatabaseAPI;
-- Création de la table "NFT"
CREATE TABLE NFT (
    NFT_ID INT,
    NFT_Name VARCHAR(255) NOT NULL,
    NFT_metadata_json JSON,
    NFT_OwnerID INT,
    NFT_RightID INT,
    FOREIGN KEY (NFT_RightID) REFERENCES `RIGHT`(Right_ID)
);

ALTER TABLE NFT
ADD COLUMN NFT_CollectionID INT;

ALTER TABLE NFT
MODIFY COLUMN NFT_ID INT AUTO_INCREMENT PRIMARY KEY

-- Supprimez la contrainte de clé étrangère existante vers `RIGHT`
ALTER TABLE NFT
DROP FOREIGN KEY NFT_RightID;

-- Mettez à jour la référence de la clé étrangère pour faire référence à la nouvelle table `rights`
ALTER TABLE NFT
ADD CONSTRAINT fk_NFT_rights
  FOREIGN KEY (NFT_RightID)
  REFERENCES `rights`(Right_ID);
