USE DatabaseAPI;
-- Création de la table "RIGHT"
CREATE TABLE `RIGHT` (
    Right_ID INT AUTO_INCREMENT PRIMARY KEY,
    Right_Name VARCHAR(255) NOT NULL,
    Right_Description TEXT
);

RENAME TABLE `RIGHT` TO `rights`;
