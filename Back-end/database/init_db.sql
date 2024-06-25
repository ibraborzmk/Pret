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
    disponible BOOLEAN DEFAULT 1,
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




INSERT INTO annonces (title, content, price, category, sous_category, city, postal_code, author_idname, author_pp,image,disponible) VALUES 
('Pelle de jardin', 'Pelle robuste idéale pour le jardinage', 15.99, 'Maison & Jardin', 'Outils de plantation', 'Lyon', '69001', 'rocky', 'pelle.jpg',1),
('Tondeuse à gazon', 'Tondeuse à gazon électrique, excellent état', 100.00, 'Maison & Jardin', 'Outils de jardinage', 'Marseille', '13001', 'apollo', 'tondeuse.jpg',1),
('Taille-haie', 'Taille-haie électrique, excellent état', 50.00, 'Maison & Jardin', 'Outils de jardinage', 'Nice', '06000', 'creed', 'taillehaie.jpg',0),
('Arrosoir', 'Arrosoir en plastique, excellent état', 10.00, 'Maison & Jardin', 'Outils de jardinage', 'Bordeaux', '33000', 'drago', 'arrosoir.jpg',1),
('Aspirateur', 'Aspirateur sans sac, excellent état', 80.00, 'Maison & Jardin', 'Électroménager', 'Lille', '59000', 'rocky', 'aspirateur.jpg',0),
('Tondeuse à cheveux', 'Tondeuse à cheveux professionnelle, excellent état', 30.00, 'Maison & Jardin', 'Soin personnel', 'Nantes', '44000', 'apollo', 'tondeusecheveux.jpg',1),
('Cafetière', 'Cafetière électrique, excellent état', 20.00, 'Maison & Jardin', 'Électroménager', 'Strasbourg', '67000', 'creed', 'cafetiere.jpg',0),
('Fer à repasser', 'Fer à repasser vapeur, excellent état', 40.00, 'Maison & Jardin', 'Électroménager', 'Paris', '75001', 'drago', 'fer.jpg',0);



-- Annonces pour Maison & Jardin
INSERT INTO annonces (title, content, price, category, sous_category, city, postal_code, author_idname, image, disponible) VALUES 
('Pelle de jardin', 'Pelle robuste idéale pour le jardinage', 15.99, 'Maison & Jardin', 'Outils de plantation', 'Lyon', '69001', 'rocky', 'pelle.jpg',1),
('Tondeuse à gazon', 'Tondeuse à gazon électrique, excellent état', 100.00, 'Maison & Jardin', 'Outils de jardinage', 'Marseille', '13001', 'apollo', 'tondeuse.jpg',1),
('Taille-haie', 'Taille-haie électrique, excellent état', 50.00, 'Maison & Jardin', 'Outils de jardinage', 'Nice', '06000', 'creed', 'taillehaie.jpg',1),
('Arrosoir', 'Arrosoir en plastique, excellent état', 10.00, 'Maison & Jardin', 'Outils de jardinage', 'Bordeaux', '33000', 'drago', 'arrosoir.jpg',1),
('Aspirateur', 'Aspirateur sans sac, excellent état', 80.00, 'Maison & Jardin', 'Électroménager', 'Lille', '59000', 'rocky', 'aspirateur.jpg',1),
('Tondeuse à cheveux', 'Tondeuse à cheveux professionnelle, excellent état', 30.00, 'Maison & Jardin', 'Soin personnel', 'Nantes', '44000', 'apollo', 'tondeusecheveux.jpg',1),
('Cafetière', 'Cafetière électrique, excellent état', 20.00, 'Maison & Jardin', 'Électroménager', 'Strasbourg', '67000', 'creed', 'cafetiere.jpg',1),
('Fer à repasser', 'Fer à repasser vapeur, excellent état', 40.00, 'Maison & Jardin', 'Électroménager', 'Paris', '75001', 'drago', 'fer.jpg',1);

-- Annonces pour Voiture
INSERT INTO annonces (title, content, price, category, sous_category, city, postal_code, author_idname, image, disponible) VALUES 
('Peugeot 208', 'Peugeot 208 en excellent état, faible kilométrage', 10000.00, 'Voiture', 'Citadine', 'Paris', '75001', 'rocky', 'peugeot.jpg',0),
('Renault Clio', 'Renault Clio en excellent état, faible kilométrage', 8000.00, 'Voiture', 'Citadine', 'Lyon', '69001', 'apollo', 'clio.jpg',1),
('Volkswagen Golf', 'Volkswagen Golf en excellent état, faible kilométrage', 12000.00, 'Voiture', 'Compacte', 'Marseille', '13001', 'creed', 'golf.jpg',1),
('Audi A3', 'Audi A3 en excellent état, faible kilométrage', 15000.00, 'Voiture', 'Compacte', 'Nice', '06000', 'drago', 'audi.jpg',1),
('BMW Serie 1', 'BMW Serie 1 en excellent état, faible kilométrage', 20000.00, 'Voiture', 'Compacte', 'Bordeaux', '33000', 'rocky', 'bmw.jpg',0),
('Mercedes Classe A', 'Mercedes Classe A en excellent état, faible kilométrage', 25000.00, 'Voiture', 'Compacte', 'Lille', '59000', 'apollo', 'mercedes.jpg',1),
('Toyota Yaris', 'Toyota Yaris en excellent état, faible kilométrage', 9000.00, 'Voiture', 'Citadine', 'Nantes', '44000', 'creed', 'yaris.jpg',1),
('Ford Fiesta', 'Ford Fiesta en excellent état, faible kilométrage', 7000.00, 'Voiture', 'Citadine', 'Strasbourg', '67000', 'drago', 'fiesta.jpg',1);


-- Annonces pour Électronique
INSERT INTO annonces (title, content, price, category, sous_category, city, postal_code, author_idname, image, disponible) VALUES 
('iPhone 12', 'iPhone 12 en excellent état, 128 Go', 800.00, 'Électronique', 'Téléphone', 'Paris', '75001', 'rocky', 'iphone.jpg',1),
('Samsung Galaxy S21', 'Samsung Galaxy S21 en excellent état, 128 Go', 700.00, 'Électronique', 'Téléphone', 'Lyon', '69001', 'apollo', 'samsung.jpg',1),
('MacBook Pro', 'MacBook Pro en excellent état, 256 Go', 1500.00, 'Électronique', 'Ordinateur', 'Marseille', '13001', 'creed', 'macbook.jpg',1),
('iPad Pro', 'iPad Pro en excellent état, 128 Go', 800.00, 'Électronique', 'Tablette', 'Nice', '06000', 'drago', 'ipad.jpg',1),
('Apple Watch', 'Apple Watch en excellent état, série 6', 400.00, 'Électronique', 'Montre connectée', 'Bordeaux', '33000', 'rocky', 'applewatch.jpg',1),
('AirPods Pro', 'AirPods Pro en excellent état, avec boîte', 200.00, 'Électronique', 'Écouteurs', 'Lille', '59000', 'apollo', 'airpods.jpg',1),
('GoPro Hero 9', 'GoPro Hero 9 en excellent état, avec accessoires', 300.00, 'Électronique', 'Caméra', 'Nantes', '44000', 'creed', 'gopro.jpg',1),
('Nintendo Switch', 'Nintendo Switch en excellent état, avec jeux', 250.00, 'Électronique', 'Console de jeu', 'Strasbourg', '67000', 'drago', 'switch.jpg',1);

-- Annonces pour Loisirs
INSERT INTO annonces (title, content, price, category, sous_category, city, postal_code, author_idname, image, disponible) VALUES 
('Vélo de course', 'Vélo de course en excellent état, cadre en carbone', 800.00, 'Loisirs', 'Vélo', 'Paris', '75001', 'rocky', 'velo.jpg',1),
('Tapis de course', 'Tapis de course en excellent état, peu utilisé', 500.00, 'Loisirs', 'Fitness', 'Lyon', '69001', 'apollo', 'tapis.jpg',1),
('Raquette de tennis', 'Raquette de tennis en excellent état, cordage neuf', 100.00, 'Loisirs', 'Tennis', 'Marseille', '13001', 'creed', 'raquette.jpg',1),
('Planche de surf', 'Planche de surf en excellent état, peu utilisée', 300.00, 'Loisirs', 'Surf', 'Nice', '06000', 'drago', 'surf.jpg',0),
('Skateboard', 'Skateboard en excellent état, trucks neufs', 50.00, 'Loisirs', 'Skate', 'Bordeaux', '33000', 'rocky', 'skate.jpg',1),
('Trottinette électrique', 'Trottinette électrique en excellent état, autonomie 30 km', 300.00, 'Loisirs', 'Trottinette', 'Lille', '59000', 'apollo', 'trottinette.jpg',1),
('Appareil photo', 'Appareil photo en excellent état, objectif 50 mm', 400.00, 'Loisirs', 'Photographie', 'Nantes', '44000', 'creed', 'appareil.jpg',1),
('Enceinte Bluetooth', 'Enceinte Bluetooth en excellent état, autonomie 10 h', 50.00, 'Loisirs', 'Audio', 'Strasbourg', '67000', 'drago', 'enceinte.jpg',1);

INSERT INTO annonces (title, content, price, category, sous_category, city, postal_code, author_idname, image, disponible) VALUES 
('Vélo de course', 'Vélo de course en excellent état, cadre en carbone', 800.00, 'Loisirs', 'Vélo', 'Paris', '75001', 'rocky', 'velo.jpg',1),
('Tapis de course', 'Tapis de course en excellent état, peu utilisé', 500.00, 'Loisirs', 'Fitness', 'Lyon', '69001', 'apollo', 'tapis.jpg',1),
('Raquette de tennis', 'Raquette de tennis en excellent état, cordage neuf', 100.00, 'Loisirs', 'Tennis', 'Marseille', '13001', 'creed', 'raquette.jpg',1),
('Planche de surf', 'Planche de surf en excellent état, peu utilisée', 300.00, 'Loisirs', 'Surf', 'Nice', '06000', 'drago', 'surf.jpg',0),
('Skateboard', 'Skateboard en excellent état, trucks neufs', 50.00, 'Loisirs', 'Skate', 'Bordeaux', '33000', 'rocky', 'skate.jpg',1),
('Trottinette électrique', 'Trottinette électrique en excellent état, autonomie 30 km', 300.00, 'Loisirs', 'Trottinette', 'Lille', '59000', 'apollo', 'trottinette.jpg',1),
('Appareil photo', 'Appareil photo en excellent état, objectif 50 mm', 400.00, 'Loisirs', 'Photographie', 'Nantes', '44000', 'creed', 'appareil.jpg',1),
('Enceinte Bluetooth', 'Enceinte Bluetooth en excellent état, autonomie 10 h', 50.00, 'Loisirs', 'Audio', 'Strasbourg', '67000', 'drago', 'enceinte.jpg',1);

