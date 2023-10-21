USE DatabaseAPI;
-- Création de la table "ADMINISTRATOR"
CREATE TABLE ADMINISTRATOR (
    Administrator_ID INT AUTO_INCREMENT PRIMARY KEY,
    Administrator_Name VARCHAR(255) NOT NULL,
    Administrator_keypub VARCHAR(255) NOT NULL,
    Administrator_keyprv VARCHAR(255) NOT NULL
);
