import React, { useState} from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Head from './Header';  // Import the exported userId
import ImageComponent from './bande-image';
import img from './image/bande.jpg';
import Annonce from './Annonce';
import Footer from './Footer';
import { AuthProvider } from './AuthContext';

const container = document.getElementById('root');
const root = createRoot(container);

const App = () => {
  const categories = ["Electronique", "Loisirs", "Autre"];
  const [additionalAnnonces, setAdditionalAnnonces] = useState([]);
  const [index, setIndex] = useState(0);
  const [buttonVisible, setButtonVisible] = useState(true);
  const handleButtonClick = () => {
    const newIndex = (index + 1) % categories.length;
    setIndex(newIndex);

    const category = categories[newIndex];
    const newAnnonce = (
      <Annonce 
        category={category} 
        count={6} 
        key={additionalAnnonces.length} 
      />
    );

    // Mise à jour de l'état avec newAnnonce de manière correcte
    setAdditionalAnnonces(prevAnnonces => [...prevAnnonces, newAnnonce]);

    // Vérifier si la catégorie 'Autre' a été ajoutée pour masquer le bouton
    if (category === "Autre") {
      setButtonVisible(false);
    }
  };



  return (
    <React.StrictMode>
      <AuthProvider>
      <Head/>
      <ImageComponent src={img} alt="bande-index" />
      <Annonce category="Voiture" count={6} />
      <Annonce category="Maison & Jardin" count={6} />
      {additionalAnnonces}
      {buttonVisible && <button className="btn" onClick={handleButtonClick}>Voir plus</button>}
      <Footer />
      </AuthProvider>
    </React.StrictMode>
  );
};

root.render(<App />);
