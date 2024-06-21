import React, { useEffect, useState } from "react";
import "./Profile.css";
import errorImage from "./image/error_image.jpg"; // Importez l'image par défaut
import errorPP from "./image/pp_image.jpg";

function Profile({ userId, handleClose, handleLogout }) {
  const [userInfo, setUserInfo] = useState({});
  const [annonces, setAnnonces] = useState([]);
  console.log("ID de l’utilisateur :", userId);

  // Fonction pour gérer l'échec du chargement de l'image
  const handleImageError = (event) => {
    event.target.src = errorImage; // Chemin de l'image par défaut
    console.log("Erreur lors du chargement de l’image");
  };

  const handleImageErrorPP = (event) => {
    event.target.src = errorPP; // Chemin de l'image par défaut
    console.log("Erreur lors du chargement de l’image");
  };

  // Charger les informations de l'utilisateur
  useEffect(() => {
    console.log("Chargement des informations pour l’utilisateur :", userId);
    if (userId) {
      // Vérifiez si userId est défini
      fetch(`http://localhost:3001/user/${userId}`)
        .then((response) => response.json())
        .then((data) => {
          if (data && data.length > 0) {
            // Vérifiez si les données reçues ne sont pas vides
            setUserInfo(data[0]);
          } else {
            console.log("Aucune information d'utilisateur trouvée");
          }
        })
        .catch((error) =>
          console.error(
            "Erreur lors de la récupération des informations de l’utilisateur",
            error
          )
        );

      // Charger les annonces de l'utilisateur
      fetch(`http://localhost:3001/user/${userId}/annonces`)
        .then((response) => response.json())
        .then((data) => {
          if (data && data.length > 0) {
            // Vérifiez si les données reçues ne sont pas vides
            setAnnonces(data);
          } else {
            console.log("Aucune annonce trouvée pour cet utilisateur");
          }
        })
        .catch((error) =>
          console.error("Erreur lors de la récupération des annonces", error)
        );
    }
  }, [userId]); // Cela s'exécutera une fois que l'ID de l'utilisateur est disponible

  return (
    <div className="arriere_plan_profile">
      <div className="profil_container">
      <button id="fermeture"onClick={handleClose}>X</button>
        <div className="user_info">
          <h2>Profil de {userInfo.nom || "Utilisateur"}</h2>
          <p>Nom: {userInfo.nom}</p>
          <p>Prenom: {userInfo.prenom}</p>
          <p>Email: {userInfo.email}</p>
        </div>
        <div className="user_annonces">
          <h2>Mes Annonces</h2>
          {annonces.map((annonce) => (
            <div className="annonce" key={annonce.id}>
              <div className="user-container">
                <img
                  src={annonce.author_pp || errorPP}
                  alt={annonce.title}
                  id="image-user"
                  onError={handleImageErrorPP}
                />
                <p>User: {annonce.author_idname}</p>
              </div>
              <img
                src={annonce.image || errorImage}
                alt={annonce.title}
                id="image-annonce"
                onError={handleImageError}
              />
              <div className="text-container">
                <div className="description">
                  <p>{annonce.title}</p>
                  <p>{annonce.price} €</p>
                </div>
                <div className="location">
                  <p>{annonce.city}</p>
                  <p>{annonce.code_postale}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="annonces_containeer_button">
          <button onClick={handleLogout}>Déconnecter</button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
