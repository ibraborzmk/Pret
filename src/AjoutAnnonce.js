import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import axios from "axios";
import "./ajoutAnnonce.css";

const categories = {
  "Maison & Jardin": [
    "Outils de plantation",
    "Outils de taille",
    "Entretien du gazon",
    "Outils de peinture",
    "Outils électriques",
    "Mesure et traçage",
    "Échelles et échafaudages",
  ],
  Voiture: [
    "Entretien général",
    "Réparation de moteur",
    "Systèmes électriques",
    "Pneus et roues",
    "Carrosserie et esthétique",
    "Suspension et direction",
    "Échappement",
    "Électronique",
  ],
  Électronique: [
    "Informatique",
    "Télécommunications",
    "Composants électroniques",
    "Audiovisuel",
    "Electronique grand public",
    "Sécurité éléctronique",
    "Energie et alimentation",
  ],
  Loisirs: [
    "Jeux de société",
    "Jeux de balle",
    "Jeux de boules",
    "Jeux d'eaux",
    "Jeux de construction",
    "Jeux de réflexion",
    "Jeux vidéo",
  ],
  Autre: [
    "Articles saisonniers",
    "Équipement de déménagement",
    "Matériel de fête et événementiel",
    "Articles de collection et hobbies rares",
    "Équipements pour animaux de compagnie",
    "Matériel éducatif et didactique",
    "Services",
  ],
};

function AjouterAnnonce({ userId, handleClose }) {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    price: "",
    category: "",
    sousCategory: "",
    city: "",
    postalCode: "",
    author_idname: userId,
    image: null,
  });

  const [errors, setErrors] = useState({});
  const [markerPosition, setMarkerPosition] = useState(null);

  const handleChange = (e) => {
    const { name, type, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = "Le titre est requis";
    if (!formData.content) newErrors.content = "Le contenu est requis";
    if (!formData.price) newErrors.price = "Le prix est requis";
    if (!formData.category) newErrors.category = "La catégorie est requise";
    if (!formData.sousCategory) newErrors.sousCategory = "La sous-catégorie est requise";
    if (!formData.city) newErrors.city = "La ville est requise";
    if (!formData.postalCode) newErrors.postalCode = "Le code postal est requis";
    if (!formData.image) newErrors.image = "L'image est requise";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const data = new FormData();
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));

    try {
      const response = await fetch("http://localhost:3001/ajouterAnnonce", {
        method: "POST",
        body: data,
      });
      if (!response.ok) {
        throw new Error("Failed to submit the form");
      }
      console.log("Annonce ajoutée avec succès");
      handleClose();
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'annonce", error);
    }
  };

  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        setMarkerPosition(e.latlng);
        const { lat, lng } = e.latlng;
        axios
          .get(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`)
          .then((response) => {
            const address = response.data.address;
            setFormData((prevFormData) => ({
              ...prevFormData,
              city: address.city || address.town || address.village || "",
              postalCode: address.postcode || "",
            }));
          })
          .catch((error) => console.error("Erreur lors de la récupération de l'adresse", error));
      },
    });

    return markerPosition ? (
      <Marker position={markerPosition}></Marker>
    ) : null;
  };

  return (
    <div className="arriere_plan_ajoutAnnonce">
      <div className="ajoutAnnonce_container">
        <button id="fermeture" onClick={handleClose}>X</button>
        <h1>Ajouter une annonce</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              name="title"
              placeholder="Titre"
              value={formData.title}
              onChange={handleChange}
            />
            {errors.title && <p className="error">{errors.title}</p>}
          </div>
          <div className="form-group">
            <textarea
              name="content"
              placeholder="Contenu"
              value={formData.content}
              onChange={handleChange}
            />
            {errors.content && <p className="error">{errors.content}</p>}
          </div>
          <div className="form-group">
            <input
              name="price"
              type="number"
              placeholder="Prix"
              value={formData.price}
              onChange={handleChange}
            />
            {errors.price && <p className="error">{errors.price}</p>}
          </div>
          <div className="form-group">
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="">Sélectionnez une catégorie</option>
              {Object.keys(categories).map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            {errors.category && <p className="error">{errors.category}</p>}
          </div>
          <div className="form-group">
            <select
              name="sousCategory"
              value={formData.sousCategory}
              onChange={handleChange}
              disabled={!formData.category}
            >
              <option value="">Sélectionnez une sous-catégorie</option>
              {formData.category &&
                categories[formData.category].map((sousCategory) => (
                  <option key={sousCategory} value={sousCategory}>
                    {sousCategory}
                  </option>
                ))}
            </select>
            {errors.sousCategory && <p className="error">{errors.sousCategory}</p>}
          </div>
          <div className="form-group">
            <input
              name="city"
              placeholder="Ville"
              value={formData.city}
              onChange={handleChange}
            />
            {errors.city && <p className="error">{errors.city}</p>}
          </div>
          <div className="form-group">
            <input
              name="postalCode"
              placeholder="Code postal"
              value={formData.postalCode}
              onChange={handleChange}
            />
            {errors.postalCode && <p className="error">{errors.postalCode}</p>}
          </div>
          <div className="form-group">
            <input name="image" type="file" onChange={handleChange} />
            {errors.image && <p className="error">{errors.image}</p>}
          </div>
          <div className="form-group map-container">
            <MapContainer
              center={[46.603354, 1.888334]}
              zoom={6}
              style={{ height: "400px", width: "100%" }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <LocationMarker />
            </MapContainer>
          </div>
          <button type="submit">Ajouter l'annonce</button>
        </form>
      </div>
    </div>
  );
}

export default AjouterAnnonce;
