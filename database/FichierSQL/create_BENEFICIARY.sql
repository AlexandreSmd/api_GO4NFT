USE DatabaseAPI;
-- Création de la table "BENEFICIARY"
CREATE TABLE BENEFICIARY (
    Beneficiary_ID INT AUTO_INCREMENT PRIMARY KEY,
    Beneficiary_Name VARCHAR(255) NOT NULL,
    Beneficiary_APIKey VARCHAR(100) UNIQUE NOT NULL,
    Beneficiary_NFTNumber INT,
    Beneficiary_NFTID INT
);
ALTER TABLE BENEFICIARY
DROP COLUMN Beneficiary_APIKey;

ALTER TABLE BENEFICIARY
ADD Beneficiary_keypub VARCHAR(255) NOT NULL,
ADD Beneficiary_keyprv VARCHAR(255) NOT NULL,
ADD Beneficiary_ETHAdress VARCHAR(255) NOT NULL;