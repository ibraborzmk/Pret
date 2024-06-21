import React, { useState, useEffect, useContext } from "react";
import "./AffichageAnnonce.css";
import imagePP from "./image/pp_image.jpg";
import imageError from "./image/error_image.jpg";
import Message from "./Message";
import { AuthContext } from "./AuthContext";

function handleImageError(event) {
  event.target.src = imageError;
}

function handleImageErrorPP(event) {
  event.target.src = imagePP;
}

function AffichageAnnonce({ annonce, onClose }) {
  const { userId } = useContext(AuthContext);
  const [showMessageAnnonce, setShowMessageAnnonce] = useState(false);
  console.log('image', annonce.image);
  const toggleMessage = () => {
    setShowMessageAnnonce(!showMessageAnnonce);
    console.log("userId", userId);
  };

  useEffect(() => {
    console.log("showMessageAnnonce", showMessageAnnonce);
  }, [showMessageAnnonce]);

  return (
    <div className="arriere_plan">
      <div className="annonce-container-affichage">
      <button id="fermeture2" onClick={onClose}>X</button>
        <div className="info-container-affichage">
          <div className="description-affichage">
            <p>{annonce.title}</p>
            <p>{annonce.price} €</p>
          </div>
          <div className="location">
            <p>{annonce.city}, {annonce.postal_code}</p>
          </div>
          <div className="description2">
            <p>{annonce.content}</p>
          </div>
        </div>
        <div className="image-container-affichage">
          <img
            src={annonce.image || imageError}
            alt={annonce.title}
            id="image-annonce-affichage"
            onError={handleImageError}
          />
        </div>
        <div className="user-container-affichage">
          <img
            src={annonce.author_pp || imagePP}
            alt={annonce.author_idname}
            id="image-user-affichage"
            onError={handleImageErrorPP}
          />
          <p>User: {annonce.author_idname}</p>
          <button onClick={toggleMessage}>Contacter</button>
        </div>
      </div>
      {showMessageAnnonce && userId !== null && (
        <Message userId={userId} handleClose={toggleMessage} userDestId={annonce.author_idname} />
      )}
    </div>
  );
}

export default AffichageAnnonce;
