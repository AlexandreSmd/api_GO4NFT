USE DatabaseAPI;
-- Création de la table "BENEFICIARYRIGHT"

CREATE TABLE BENEFICIARYRIGHT (
    BeneficiaryRight_RightID INT NOT NULL,
    BeneficiaryRight_BeneficiaryID INT NOT NULL,
    PRIMARY KEY (BeneficiaryRight_RightID, BeneficiaryRight_BeneficiaryID)
);
