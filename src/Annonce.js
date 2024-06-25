import React, { useEffect, useState, useContext } from "react";
import "./Annonce.css";
import errorImage from "./image/error_image.jpg"; // Importez l'image par défaut
import errorPP from "./image/pp_image.jpg";
import AffichageAnnonce from "./AffichageAnnonce"; // Import du nouveau composant
import { AuthContext } from "./AuthContext";

function Annonce({ user, category, count }) {
  const [annonces, setAnnonces] = useState([]);
  const [selectedAnnonce, setSelectedAnnonce] = useState(null); // État pour gérer l'annonce sélectionnée
  const [goaffichageAnnonce, setgoAffichageAnnonce] = useState(false);
  const { userId } = useContext(AuthContext);

  useEffect(() => {
    fetch('http://localhost:3001/annonces')
      .then(response => response.json())
      .then(data => {
        setAnnonces(data);
        console.log('images récupérées:', data.image);
        console.log('Annonces récupérées:', data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des annonces:', error);
      });
  }, [category]);

  const filteredAnnonces = annonces.filter(annonce => annonce.category === category);
  const selectedAnnonces = filteredAnnonces.slice(0, count);

  const handleImageError = (event) => {
    event.target.src = errorImage;
  };

  const handleImageErrorPP = (event) => {
    event.target.src = errorPP;
  };

  const handleAnnonceClick = (annonce) => {
    setSelectedAnnonce(annonce); // Mettre à jour l'état avec l'annonce cliquée
    setgoAffichageAnnonce(!goaffichageAnnonce);
  };

  return (
    <div id="categorie">
      <p>{category}</p>
      {selectedAnnonces.map(annonce => {
        let uploadeImage = `../public/${annonce.image}`;
        return (
          <div className="annonce" key={annonce.id} onClick={() => handleAnnonceClick(annonce)}>
            <div className="user-container">
              <img src={annonce.author_pp || errorPP} alt={annonce.title} id="image-user" onError={handleImageErrorPP} />
              <p>User: {annonce.author_idname}</p>
            </div>
            <img src={uploadeImage || errorImage} alt={annonce.title} id="image-annonce" onError={handleImageError} />
            <div className="text-container">
              <div className="description">
                <p>{annonce.title}</p>
                <p>{annonce.price} €</p>
              </div>
              <div className="location">
                <p>{annonce.city}</p>
                <p>,</p>
                <p>{annonce.postal_code}</p>
              </div>
            </div>
          </div>
        );
      })}
      {selectedAnnonce && goaffichageAnnonce && <AffichageAnnonce annonce={selectedAnnonce} onClose={handleAnnonceClick} />}
    </div>
  );
}

export default Annonce;
