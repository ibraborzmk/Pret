import React, { useEffect, useState } from "react";
import "./Recherche.css";
import AffichageAnnonce from "./AffichageAnnonce";

function Recherche({ term, onClose }) {
  const [results, setResults] = useState([]);
  const [selectedAnnonce, setSelectedAnnonce] = useState(null);
  const [goAffichageAnnonce, setGoAffichageAnnonce] = useState(false);

  const toggleAffichageAnnonce = () => {
    setGoAffichageAnnonce(false);
    setSelectedAnnonce(null);
  };

  useEffect(() => {
    if (term) {
      fetch(`http://localhost:3001/recherche/${term}`)
        .then((response) => response.json())
        .then((data) => {
          setResults(data);
          toggleAffichageAnnonce();
          console.log("Résultats de la recherche:", data);
        })
        .catch((error) => console.error("Erreur lors de la recherche", error));
    }
  }, [term]);

  const handleAnnonceClick = (annonce) => {
    setSelectedAnnonce(annonce);
    setGoAffichageAnnonce(true); // S'assurer que l'affichage est activé lors de la sélection
  };

  return (
    <div className="arr-plan-recherche">
      <div className="recherche_container">
      <button id="fermeture" onClick={onClose}>x</button>
        <h1>Résultats de la recherche</h1>
        <div className="results">
          {results.map((result) => (
            <div
              className="annonce-recherche"
              key={result.id}
              onClick={() => handleAnnonceClick(result)}
            >
              <h2>{result.title}</h2>
              <p>{result.content}</p>
              <p>Prix: {result.price} €</p>
            </div>
          ))}
        </div>
        {selectedAnnonce && goAffichageAnnonce && (
          <AffichageAnnonce
            annonce={selectedAnnonce}
            onClose={toggleAffichageAnnonce}
          />
        )}
      </div>
    </div>
  );
}

export default Recherche;
