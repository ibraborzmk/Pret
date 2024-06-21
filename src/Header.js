import React, { useState , useContext} from "react";
import "./Header.css";
import iconPreter from "./image/preter.png"; // Importez l'icône
import iconCar from "./image/car.png"; // Importez l'icône
import iconElectronic from "./image/electronic.png"; // Importez l'icône
import iconHouse from "./image/house.png"; // Importez l'icône
import iconLeisure from "./image/leisure.png"; // Importez l'icône
import iconOther from "./image/other.png"; // Importez l'icône
import SearchBar from "./SearchBar.js";
import LoginModal from "./LoginModal.js"; // Importez le composant LoginModal
import Profile from "./Profile.js"; // Importez le composant Profile
import Message from "./Message.js";
import AjoutAnnonce from "./AjoutAnnonce.js";
import Categorie from "./Categorie.js";
import Inscription from "./Inscription.js";
import Recherche from "./Recherche.js";
import { AuthContext } from "./AuthContext"; // Importez le contexte d'authentification


let exportedUserId = null; 

function App() {
  // eslint-disable-next-line
  const [filteredAnnonces, setFilteredAnnonces] = useState([]); // État pour stocker les annonces filtrées
  const [showMoreButtonsAutre, setShowMoreButtonsAutre] = useState(false); // État pour afficher les boutons supplémentaires
  const [showMoreButtonsLoisirs, setShowMoreButtonsLoisirs] = useState(false); // État pour afficher les boutons supplémentaires de la catégorie Loisirs
  const [showMoreButtonsElectronique, setShowMoreButtonsElectronique] =
    useState(false); // État pour afficher les boutons supplémentaires
  const [showMoreButtonsMaison, setShowMoreButtonsMaison] = useState(false); // État pour afficher les boutons supplémentaires
  const [showMoreButtonsVoiture, setShowMoreButtonsVoiture] = useState(false); // État pour afficher les boutons supplémentaires
  const [showModal, setShowModal] = useState(false); // État pour afficher la fenêtre modale de connexion
  const [showConnected, setShowConnected] = useState(false); // État pour afficher le bouton de connexion
  const [showProfile, setShowProfile] = useState(false); // État pour afficher le profil de l'utilisateur
  const [showMessage, setShowMessage] = useState(false); // État pour afficher la fenêtre de messagerie
  const [showAjoutAnnonce, setShowAjoutAnnonce] = useState(false); // État pour afficher la fenêtre d'ajout d'annonce
  const [goToRecherche, setGoToRecherche] = useState(false);
  const [goToTerm, setGoToTerm] = useState(null);
  const [goToCategorie, setGoToCategorie] = useState(null);
  const [goToSousCategorie, setGoToSousCategorie] = useState(null);
  const [showCategrorie, setShowCategorie] = useState(false);
  const [showInscription, setShowInscription] = useState(false);
  const { userId, setUserId } = useContext(AuthContext);


  const toggleModal = () => {
    if (!showConnected) {
      setShowModal(!showModal);
    } else {
      setShowProfile(!showProfile);
    }
  };

  const toggleProfil = () => {
    setShowProfile(!showProfile);
  };
  const toggleMessage = () => {
    if (!showConnected) {
      toggleModal();
      return;
    } else {
      setShowMessage(!showMessage);
    }
  };

  const toggleInscription = () => {
    setShowInscription(!showInscription);
  };

  const toggleCategorie = (categorie, sousCategories) => {
    if (!showConnected) {
      toggleModal();
      return;
    } else {
      setGoToCategorie(categorie);
      setGoToSousCategorie(sousCategories);
      setShowCategorie(!showCategrorie);
    }
  };

  const toggleRecherche = () => {
    if (!showConnected) {
      toggleModal();
      return;
    } else {
      setGoToRecherche(!goToRecherche);
    }
  };

  const toggleAjoutAnnonce = () => {
    if (!showConnected) {
      toggleModal();
      return;
    } else {
      setShowAjoutAnnonce(!showAjoutAnnonce);
    }
  };

  const toggleConnected = (idName) => {
    setUserId(idName);  // Mise à jour directe de userId avec idName
    exportedUserId = idName;  // Mise à jour de exportedUserId
    setShowConnected((prevShowConnected) => !prevShowConnected); // Utilisez une fonction de mise à jour pour inverser showConnected
  };
  
  const handleSearch = (term) => {
    if (!showConnected) {
      toggleModal();
      return;
    } else {
      setGoToRecherche(true);
      setGoToTerm(term);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="icon-container">
          <img src={iconPreter} alt="Preter Icon" className="icon-preter" />
          <p className="icon-text">PretOutils</p>
        </div>
        <button onClick={toggleAjoutAnnonce} id="ajouter">
          Ajouter une annonce
        </button>
        <SearchBar onSearch={handleSearch} className="rechercher" />
        <button id="message" onClick={toggleMessage}>
          Message
        </button>
        <button
          id="se-connecter"
          onClick={toggleModal}
        >
          {showConnected ? "Profil" : "Se connecter"}
        </button>
      </header>
      <div className="categorie">
        {/* Boutons supplémentaires alignés verticalement */}
        <button
          onMouseEnter={() => {
            setShowMoreButtonsMaison(true);
            setShowMoreButtonsAutre(false);
            setShowMoreButtonsLoisirs(false);
            setShowMoreButtonsElectronique(false);
            setShowMoreButtonsVoiture(false);
          }}
        >
          Maison & Jardin
        </button>
        {showMoreButtonsMaison && (
          <div
            className="categorie-maison"
            onMouseLeave={() => setShowMoreButtonsMaison(false)}
          >
            {/* Boutons supplémentaires à afficher */}
            <div className="sous-categorie">
              <img
                src={iconHouse}
                alt="Maison & Jardin"
                className="icon-sous-categorie"
              />
              <h2>Maison & Jardin</h2>
            </div>
            <div className="buttons-maison">
              <button
                onClick={() =>
                  toggleCategorie("Maison & Jardin", "Outils de plantation ")
                }
              >
                Outils de plantation{" "}
              </button>
              <button
                onClick={() =>
                  toggleCategorie("Maison & Jardin", "Outils de taille")
                }
              >
                Outils de taille
              </button>
              <button
                onClick={() =>
                  toggleCategorie("Maison & Jardin", "Entretien du gason")
                }
              >
                Entretien du gason
              </button>
              <button
                onClick={() =>
                  toggleCategorie("Maison & Jardin", "Outils de peinture")
                }
              >
                Outils de peinture
              </button>
              <button
                onClick={() =>
                  toggleCategorie("Maison & Jardin", "Outils éléctriques")
                }
              >
                Outils éléctriques
              </button>
              <button
                onClick={() =>
                  toggleCategorie("Maison & Jardin", "Mesure et traçage")
                }
              >
                Mesure et traçage
              </button>
              <button
                onClick={() =>
                  toggleCategorie("Maison & Jardin", "Echelles et echafaudages")
                }
              >
                Echelles et echafaudages
              </button>
            </div>
          </div>
        )}

        <button
          onMouseEnter={() => {
            setShowMoreButtonsVoiture(true);
            setShowMoreButtonsAutre(false);
            setShowMoreButtonsLoisirs(false);
            setShowMoreButtonsElectronique(false);
            setShowMoreButtonsMaison(false);
          }}
        >
          Voiture
        </button>
        {showMoreButtonsVoiture && (
          <div
            className="categorie-voiture"
            onMouseLeave={() => setShowMoreButtonsVoiture(false)}
          >
            {/* Boutons supplémentaires à afficher */}
            <div className="sous-categorie">
              <img
                src={iconCar}
                alt="Voiture"
                className="icon-sous-categorie"
              />
              <h2>Voiture</h2>
            </div>
            <div className="buttons-voiture">
              <button
                onClick={() => toggleCategorie("Voiture", "Entretien generale")}
              >
                Entretien général
              </button>
              <button
                onClick={() =>
                  toggleCategorie("Voiture", "Reparation de moteur")
                }
              >
                Réparation de moteur{" "}
              </button>
              <button
                onClick={() =>
                  toggleCategorie("Voiture", "Systemes électriques")
                }
              >
                Systèmes électriques
              </button>
              <button
                onClick={() => toggleCategorie("Voiture", "Pneus et roues")}
              >
                Pneus et roues{" "}
              </button>
              <button
                onClick={() =>
                  toggleCategorie("Voiture", "Carrosserie et esthétique")
                }
              >
                {" "}
                Carrosserie et esthétique{" "}
              </button>
              <button
                onClick={() =>
                  toggleCategorie("Voiture", "Suspension et direction")
                }
              >
                Suspension et direction{" "}
              </button>
              <button onClick={() => toggleCategorie("Voiture", "Échappement")}>
                Échappement{" "}
              </button>
            </div>
          </div>
        )}

        <button
          onMouseEnter={() => {
            setShowMoreButtonsElectronique(true);
            setShowMoreButtonsAutre(false);
            setShowMoreButtonsLoisirs(false);
            setShowMoreButtonsMaison(false);
            setShowMoreButtonsVoiture(false);
          }}
        >
          Electronique
        </button>
        {showMoreButtonsElectronique && (
          <div
            className="categorie-electronique"
            onMouseLeave={() => setShowMoreButtonsElectronique(false)}
          >
            {/* Boutons supplémentaires à afficher */}
            <div className="sous-categorie">
              <img
                src={iconElectronic}
                alt="Electronique"
                className="icon-sous-categorie"
              />
              <h2>Electronique</h2>
            </div>
            <div className="buttons-electronique">
              <button onClick={()=>toggleCategorie("Electronique","Informatique")}>Informatique</button>
              <button onClick={()=>toggleCategorie("Electronique","Telecommunications")} >Télécommunications</button>
              <button onClick={()=>toggleCategorie("Electronique","Composants electroniques")} >Composants électroniques</button>
              <button onClick={()=>toggleCategorie("Electronique","Audiovisuel")} >Audiovisuel</button>
              <button onClick={()=>toggleCategorie("Electronique","Electronique grand public ")}>Électronique grand public </button>
              <button onClick={()=>toggleCategorie("Electronique","Sécurite electronique")}>Sécurité électronique </button>
              <button onClick={()=>toggleCategorie("Electronique","Energie et alimentation")}>Énergie et alimentation</button>
            </div>
          </div>
        )}
        <button
          onMouseEnter={() => {
            setShowMoreButtonsLoisirs(true);
            setShowMoreButtonsAutre(false);
            setShowMoreButtonsElectronique(false);
            setShowMoreButtonsMaison(false);
            setShowMoreButtonsVoiture(false);
          }}
        >
          Loisirs
        </button>
        {showMoreButtonsLoisirs && (
          <div
            className="categorie-loisirs"
            onMouseLeave={() => setShowMoreButtonsLoisirs(false)}
          >
            {/* Boutons supplémentaires à afficher */}
            <div className="sous-categorie">
              <img
                src={iconLeisure}
                alt="Loisirs"
                className="icon-sous-categorie"
              />
              <h2>Loisirs</h2>
            </div>
            <div className="buttons-loisirs">
              <button onClick={()=>toggleCategorie("Loisirs", "Jeux de société")}>Jeux de société</button>
              <button onClick={()=>toggleCategorie("Loisirs", "Jeux de balle")}> Jeux de balle</button>
              <button onClick={()=>toggleCategorie("Loisirs" , "eux de boules")}>Jeux de boules</button>
              <button onClick={()=>toggleCategorie("Loisirs", "Jeux d'eaux")}>Jeux d'eaux</button>
              <button onClick={()=>toggleCategorie("Loisirs", "Jeux de construction")}>Jeux de construction</button>
              <button onClick={()=>toggleCategorie("Loisirs", "Jeux de réflexion")}>Jeux de réflexion</button>
              <button onClick={()=>toggleCategorie("Loisirs", "Jeux vidéo")}>Jeux vidéo</button>
            </div>
          </div>
        )}
        <button
          onMouseEnter={() => {
            setShowMoreButtonsAutre(true);
            setShowMoreButtonsLoisirs(false);
            setShowMoreButtonsElectronique(false);
            setShowMoreButtonsMaison(false);
            setShowMoreButtonsVoiture(false);
          }}
        >
          Autre
        </button>
        {showMoreButtonsAutre && (
          <div
            className="categorie-autre"
            onMouseLeave={() => setShowMoreButtonsAutre(false)}
          >
            {/* Boutons supplémentaires à afficher */}
            <div className="sous-categorie">
              <img
                src={iconOther}
                alt="Autre"
                className="icon-sous-categorie"
              />
              <h2>Autre</h2>
            </div>
            <div className="buttons-autre">
              <button onClick={()=>toggleCategorie("Autre","Articles saisonniers")}>Articles saisonniers</button>
              <button onClick={()=>toggleCategorie("Autre","Equipement de demenagement")}>Équipement de déménagement </button>
              <button onClick={()=>toggleCategorie("Autre",">Materiel de fete et evenementiel")}>Matériel de fête et événementiel </button>
              <button onClick={()=>toggleCategorie("Autre","Articles de collection et hobbies rares ")}>Articles de collection et hobbies rares </button>
              <button onClick={()=>toggleCategorie("Autre","Equipements pour animaux de compagnie ")}>Équipements pour animaux de compagnie </button>
              <button onClick={()=>toggleCategorie("Autre","Materiel educatif et didactique ")}>Matériel éducatif et didactique </button>
              <button onClick={()=>toggleCategorie("Autre","Serviice")}> Serviice</button>
            </div>
          </div>
        )}
      </div>
      <main>
        <div>
          {/* Affichage des annonces filtrées */}
          {filteredAnnonces.map((annonce) => (
            <div key={annonce.id}>
              <h2>{annonce.titre}</h2>
              <p>{annonce.description}</p>
              <p>Prix: {annonce.prix} €</p>
            </div>
          ))}
        </div>
      </main>
      {/* Affichage de la fenêtre modale */}
      {showModal && (
        <LoginModal onClose={toggleModal} onLoginSuccess={toggleConnected} onOpenSignUp={toggleInscription}/>
      )}
      {showConnected &&
        showProfile &&
        userId !== null && ( // Assurez-vous que userId est non nul avant de rendre le Profile
          <Profile
            userId={userId} // Passage de userId au composant Profile
            handleClose={toggleProfil} // Fonction pour gérer la fermeture du Profile
            handleLogout={() => toggleConnected(null)} // Fonction pour gérer la déconnexion, réinitialiser userId
          />
        )}
      {showConnected && showMessage && userId !== null && (
        <Message userId={userId} handleClose={toggleMessage} />
      )}
      {showConnected && showAjoutAnnonce && (
        <AjoutAnnonce userId={userId} handleClose={toggleAjoutAnnonce} />
      )}
      {showConnected && goToRecherche && goToTerm !== "" && (
        <Recherche term={goToTerm} onClose={toggleRecherche} />
      )}
      {showConnected &&
        goToCategorie != null &&
        goToSousCategorie != null &&
        showCategrorie && (
          <Categorie
            categorie={goToCategorie}
            sousCategories={goToSousCategorie}
            onClose={toggleCategorie}
          />
        )}
        {!showConnected && showInscription && (
          <Inscription onClose={toggleInscription}/>
        )}
    </div>
  );
}

export {exportedUserId} ;  // Exportez userId pour une utilisation externe
export default App;

