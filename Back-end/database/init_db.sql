-- Créer la base de données
DROP DATABASE IF EXISTS outils_db;
CREATE DATABASE IF NOT EXISTS outils_db;
USE outils_db;

-- Créer la table 'users'
CREATE TABLE IF NOT EXISTS users (
    idname VARCHAR(10) PRIMARY KEY,
    nom VARCHAR(100),
    prenom VARCHAR(100),
    email VARCHAR(100),
    pp MEDIUMBLOB, -- photo de profil
    password VARCHAR(100),
    date_enter TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Créer les autres tables nécessaires
CREATE TABLE IF NOT EXISTS conversations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    conversation_id INT,
    creator_idname VARCHAR(10),
    receiver_idname VARCHAR(10),
    title VARCHAR(255),
    FOREIGN KEY (creator_idname) REFERENCES users(idname) ON DELETE CASCADE,
    FOREIGN KEY (receiver_idname) REFERENCES users(idname) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    conversation_id INT,
    user_idname VARCHAR(10),
    user_dest_idname VARCHAR(10),
    message TEXT NOT NULL,
    sent_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_idname) REFERENCES users(idname) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS annonces (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    category VARCHAR(255) NOT NULL,
    sous_category VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    postal_code VARCHAR(255) NOT NULL,
    author_idname VARCHAR(100),
    author_pp VARCHAR(255),
    published_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    image VARCHAR(255),
    FOREIGN KEY (author_idname) REFERENCES users(idname) ON DELETE SET NULL
);


INSERT INTO users (idname, nom, prenom, email, password) VALUES 
('rocky', 'Balboa', 'Rocky', 'rrr@gmail.com', 'password'),
('creed', 'Creed', 'Adonis', 'creed.adonis@gmail.com', 'password123'),
('apollo', 'Creed', 'Apollo', 'apollo.creed@gmail.com', 'password123'),
('drago', 'Drago', 'Ivan', 'drago.ivan@gmail.com', 'password123');

-- Insérer les conversations
INSERT INTO conversations  (conversation_id , creator_idname, receiver_idname, title) VALUES 
(1, 'rocky', 'creed', 'Creed'),
(1 , 'creed', 'rocky', 'Rocky'),
(2 , 'rocky', 'apollo', 'Apollo'),
(2 , 'apollo', 'rocky', 'Rocky'),
(3, 'rocky', 'drago', 'Drago'),
(3, 'drago', 'rocky', 'Rocky'),
(4, 'creed', 'apollo', 'Apollo'),
(4, 'apollo', 'creed', 'Creed'),
(5, 'creed', 'drago', 'Drago'),
(5, 'drago', 'creed', 'Creed'),
(6, 'apollo', 'drago', 'Drago'),
(6,'drago', 'apollo', 'Apollo');



-- Maintenant, insérer les messages en utilisant les IDs corrects
INSERT INTO messages (conversation_id, user_idname, user_dest_idname, message) VALUES 
(1, 'rocky', 'creed', 'Salut Creed, comment vas-tu ?'),
(1, 'creed', 'rocky', 'Salut Rocky, je vais bien merci et toi ?'),
(1, 'rocky', 'creed', 'Je vais bien aussi, merci. Tu as vu la nouvelle annonce ?'),
(1, 'creed', 'rocky', 'Oui, elle est superbe !'),
(1, 'rocky', 'creed', 'Je suis d''accord !'),
(1, 'creed', 'rocky', 'On se voit bientôt ?'),
(1, 'rocky', 'creed', 'Oui, je suis dispo demain après-midi'),
(1, 'creed', 'rocky', 'D''accord, je serai là !'),
(2, 'rocky', 'apollo', 'Salut Apollo, comment vas-tu ?'),
(2, 'apollo', 'rocky', 'Salut Rocky, je vais bien merci et toi ?'),
(2, 'rocky', 'apollo', 'Je vais bien aussi, merci. Tu as vu la nouvelle annonce ?'),
(2, 'apollo', 'rocky', 'Oui, elle est superbe !'),
(2, 'rocky', 'apollo', 'Je suis d''accord !'),
(2, 'apollo', 'rocky', 'On se voit bientôt ?'),
(2, 'rocky', 'apollo', 'Oui, je suis dispo demain après-midi'),
(2, 'apollo', 'rocky', 'D''accord, je serai là !'),
(3, 'rocky', 'drago', 'Salut Drago, comment vas-tu ?'),
(3, 'drago', 'rocky', 'Salut Rocky, je vais bien merci et toi ?'),
(3, 'rocky', 'drago', 'Je vais bien aussi, merci. Tu as vu la nouvelle annonce ?'),
(3, 'drago', 'rocky', 'Oui, elle est superbe !'),
(3, 'rocky', 'drago', 'Je suis d''accord !'),
(3, 'drago', 'rocky', 'On se voit bientôt ?'),
(3, 'rocky', 'drago', 'Oui, je suis dispo demain après-midi'),
(3, 'drago', 'rocky', 'D''accord, je serai là !'),
(4, 'creed', 'apollo', 'Salut Apollo, comment vas-tu ?'),
(4, 'apollo', 'creed', 'Salut Creed, je vais bien merci et toi ?'),
(4, 'creed', 'apollo', 'Je vais bien aussi, merci. Tu as vu la nouvelle annonce ?'),
(4, 'apollo', 'creed', 'Oui, elle est superbe !'),
(4, 'creed', 'apollo', 'Je suis d''accord !'),
(4, 'apollo', 'creed', 'On se voit bientôt ?'),
(4, 'creed', 'apollo' , 'Oui, je suis dispo demain après-midi'),
(4, 'apollo', 'creed', 'D''accord, je serai là !'),
(5, 'creed', 'drago', 'Salut Drago, comment vas-tu ?'),
(5, 'drago', 'creed', 'Salut Creed, je vais bien merci et toi ?'),
(5, 'creed', 'drago', 'Je vais bien aussi, merci. Tu as vu la nouvelle annonce ?'),
(5, 'drago', 'creed', 'Oui, elle est superbe !'),
(5, 'creed', 'drago', 'Je suis d''accord !'),
(5, 'drago', 'creed', 'On se voit bientôt ?'),
(5, 'creed', 'drago', 'Oui, je suis dispo demain après-midi'),
(5, 'drago', 'creed', 'D''accord, je serai là !'),
(6, 'apollo', 'drago', 'Salut Drago, comment vas-tu ?'),
(6, 'drago', 'apollo', 'Salut Apollo, je vais bien merci et toi ?'),
(6, 'apollo', 'drago', 'Je vais bien aussi, merci. Tu as vu la nouvelle annonce ?'),
(6, 'drago', 'apollo', 'Oui, elle est superbe !'),
(6, 'apollo', 'drago', 'Je suis d''accord !'),
(6, 'drago', 'apollo', 'On se voit bientôt ?'),
(6, 'apollo', 'drago', 'Oui, je suis dispo demain après-midi'),
(6, 'drago', 'apollo', 'D''accord, je serai là !');




INSERT INTO annonces (title, content, price, category, sous_category, city, postal_code, author_idname, author_pp, image) VALUES 
('Marteau', 'Marteau en très bon état', 10, 'Voiture' , 'Reparation de moteur' , 'Paris', '75001', 'rocky', 'rocky.jpg', 'marteau.jpg'),
('Perceuse', 'Perceuse en très bon état', 50, 'Maison & Jardin' , 'Outils electrique' , 'Paris', '75001', 'creed', 'creed.jpg', 'perceuse.jpg'),
('Scie', 'Scie en très bon état', 30, 'Maison & Jardin' , 'Outils electrique' , 'Paris', '75001', 'apollo', 'apollo.jpg', 'scie.jpg'),
('Tournevis', 'Tournevis en très bon état', 5, 'Maison & Jardin' , 'Outils electrique' , 'Paris', '75001', 'drago', 'drago.jpg', 'tournevis.jpg');



-- Annonces pour Maison & Jardin
INSERT INTO annonces (title, content, price, category, sous_category, city, postal_code, author_idname, image) VALUES 
('Pelle de jardin', 'Pelle robuste idéale pour le jardinage', 15.99, 'Maison & Jardin', 'Outils de plantation', 'Lyon', '69001', 'rocky', 'pelle.jpg'),
('Sécateur', 'Sécateur haute performance pour tailler vos plantes', 20.00, 'Maison & Jardin', 'Outils de taille', 'Marseille', '13001', 'apollo', 'secateur.jpg'),
('Tondeuse à gazon', 'Tondeuse électrique peu utilisée', 100.00, 'Maison & Jardin', 'Entretien du gazon', 'Nice', '06000', 'creed', 'tondeuse.jpg'),
('Kit de peinture', 'Comprend rouleaux, pinceaux et plateau', 25.00, 'Maison & Jardin', 'Outils de peinture', 'Toulouse', '31000', 'drago', 'kitpeinture.jpg'),
('Arrosoir', 'Arrosoir en plastique, 5 litres', 10.00, 'Maison & Jardin', 'Arrosage', 'Bordeaux', '33000', 'rocky', 'arrosoir.jpg'),
('Tuyau d arrosage', 'Tuyau d arrosage de 20 mètres', 15.00, 'Maison & Jardin', 'Arrosage', 'Lille', '59000', 'apollo', 'tuyau.jpg'),
('Engrais', 'Engrais pour plantes, 1 kg', 5.00, 'Maison & Jardin', 'Soins des plantes', 'Nantes', '44000', 'creed', 'engrais.jpg'),
('Graines de fleurs', 'Paquet de graines de fleurs variées', 3.00, 'Maison & Jardin', 'Soins des plantes', 'Strasbourg', '67000', 'drago', 'graines.jpg');

-- Annonces pour Voiture
INSERT INTO annonces (title, content, price, category, sous_category, city, postal_code, author_idname, image) VALUES 
('Kit d\'entretien voiture', 'Tout le nécessaire pour l\'entretien de votre voiture', 30.00, 'Voiture', 'Entretien général', 'Bordeaux', '33000', 'rocky', 'kitentretien.jpg'),
('Moteur occasion', 'Moteur en bon état, peu servi', 250.00, 'Voiture', 'Réparation de moteur', 'Lille', '59000', 'apollo', 'moteur.jpg'),
('Batterie auto', 'Batterie de voiture haute capacité', 70.00, 'Voiture', 'Systèmes électriques', 'Nantes', '44000', 'creed', 'batterie.jpg'),
('Jeu de pneus hiver', 'Pneus hiver, excellent état, peu utilisés', 120.00, 'Voiture', 'Pneus et roues', 'Strasbourg', '67000', 'drago', 'pneushiver.jpg'),
('Pare-chocs avant', 'Pare-chocs avant pour voiture de marque', 80.00, 'Voiture', 'Carrosserie', 'Paris', '75001', 'rocky', 'parechocs.jpg'),
('Phares avant', 'Phares avant pour voiture de marque', 50.00, 'Voiture', 'Éclairage', 'Lyon', '69001', 'apollo', 'phares.jpg'),
('Rétroviseur', 'Rétroviseur pour voiture de marque', 30.00, 'Voiture', 'Carrosserie', 'Marseille', '13001', 'creed', 'retroviseur.jpg'),
('Siège auto', 'Siège auto pour enfant, excellent état', 40.00, 'Voiture', 'Intérieur', 'Toulouse', '31000', 'drago', 'siegeauto.jpg');


-- Annonces pour Électronique
INSERT INTO annonces (title, content, price, category, sous_category, city, postal_code, author_idname, image) VALUES 
('Ordinateur portable', 'Laptop performant et en bon état', 300.00, 'Électronique', 'Informatique', 'Paris', '75001', 'rocky', 'laptop.jpg'),
('Téléphone débloqué', 'Smartphone dernier cri, comme neuf', 400.00, 'Électronique', 'Télécommunications', 'Lyon', '69001', 'apollo', 'smartphone.jpg'),
('Carte électronique', 'Carte mère pour montage électronique', 50.00, 'Électronique', 'Composants électroniques', 'Marseille', '13001', 'creed', 'cartemere.jpg'),
('Système home cinéma', 'Home cinéma pour une expérience audiovisuelle incroyable', 150.00, 'Électronique', 'Audiovisuel', 'Toulouse', '31000', 'drago', 'homecinema.jpg'),
('Appareil photo', 'Appareil photo numérique, excellent état', 200.00, 'Électronique', 'Photographie', 'Nice', '06000', 'rocky', 'appareilphoto.jpg'),
('Casque audio', 'Casque audio sans fil, excellent son', 100.00, 'Électronique', 'Audio', 'Bordeaux', '33000', 'apollo', 'casque.jpg'),
('Enceinte Bluetooth', 'Enceinte Bluetooth portable, son puissant', 80.00, 'Électronique', 'Audio', 'Lille', '59000', 'creed', 'enceinte.jpg'),
('Lecteur DVD', 'Lecteur DVD de salon, excellent état', 50.00, 'Électronique', 'Audiovisuel', 'Nantes', '44000', 'drago', 'lecteurdvd.jpg');

-- Annonces pour Loisirs
INSERT INTO annonces (title, content, price, category, sous_category, city, postal_code, author_idname, image) VALUES 
('Monopoly', 'Jeu de société Monopoly, complet avec toutes les pièces', 20.00, 'Loisirs', 'Jeux de société', 'Bordeaux', '33000', 'rocky', 'monopoly.jpg'),
('Ballon de football', 'Ballon officiel taille réglementaire, presque neuf', 15.00, 'Loisirs', 'Jeux de balle', 'Lille', '59000', 'apollo', 'ballon.jpg'),
('Jeu de pétanque', 'Set complet pour pétanque, idéal pour l été', 25.00, 'Loisirs', 'Jeux de boules', 'Nantes', '44000', 'creed', 'petanque.jpg'),
('Console de jeux', 'Console de dernière génération en excellent état', 200.00, 'Loisirs', 'Jeux vidéo', 'Strasbourg', '67000', 'drago', 'console.jpg'),
('Raquettes de tennis', 'Raquettes de tennis en bon état', 30.00, 'Loisirs', 'Sports de raquette', 'Paris', '75001', 'rocky', 'raquettes.jpg'),
('Vélo de course', 'Vélo de course en aluminium, excellent état', 300.00, 'Loisirs', 'Cyclisme', 'Lyon', '69001', 'apollo', 'velo.jpg'),
('Tapis de yoga', 'Tapis de yoga en caoutchouc, excellent état', 20.00, 'Loisirs', 'Yoga', 'Marseille', '13001', 'creed', 'tapis.jpg'),
('Planche de surf', 'Planche de surf en fibre de verre, excellent état', 150.00, 'Loisirs', 'Surf', 'Toulouse', '31000', 'drago', 'surf.jpg');

INSERT INTO annonces (title, content, price, category, sous_category, city, postal_code, author_idname, image) VALUES 
('Service ménage' , 'Service de ménage à domicile', 20.00, 'Autre' , 'Service' , 'Paris', '75001', 'rocky', 'menage.jpg'),
('Service jardinage' , 'Service de jardinage à domicile', 30.00, 'Autre' , 'Service' , 'Paris', '75001', 'creed', 'jardinage.jpg'),
('Service bricolage' , 'Service de bricolage à domicile', 25.00, 'Autre' , 'Service' , 'Paris', '75001', 'apollo', 'bricolage.jpg'),
('Service garde d enfants' , 'Service de garde d enfants à domicile', 15.00, 'Autre' , 'Service' , 'Paris', '75001', 'drago', 'gardeenfants.jpg'),
('Service repassage' , 'Service de repassage à domicile', 10.00, 'Autre' , 'Service' , 'Paris', '75001', 'rocky', 'repassage.jpg'),
('Service baby-sitting' , 'Service de baby-sitting à domicile', 20.00, 'Autre' , 'Service' , 'Paris', '75001', 'apollo', 'babysitting.jpg'),
('Service cours particuliers' , 'Service de cours particuliers à domicile', 25.00, 'Autre' , 'Service' , 'Paris', '75001', 'creed', 'cours.jpg'),
('Service déménagement' , 'Service de déménagement à domicile', 50.00, 'Autre' , 'Service' , 'Paris', '75001', 'drago', 'demenagement.jpg');
