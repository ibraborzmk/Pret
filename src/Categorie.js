import React, { useEffect, useState } from 'react';
import './Categorie.css';
import errorImage from './image/error_image.jpg';
import errorPP from './image/pp_image.jpg';
import AffichageAnnonce from './AffichageAnnonce';

function Categorie({ categorie, sousCategories, onClose }) {
    const [annonces, setAnnonces] = useState([]);
    const [selectedAnnonce, setSelectedAnnonce] = useState(null);

    const handleImageError = (event) => {
        event.target.src = errorImage;
        console.log('Erreur lors du chargement de l’image');
    };

    const handleImageErrorPP = (event) => {
        event.target.src = errorPP;
        console.log('Erreur lors du chargement de l’image');
    };

    const handleAnnonceClick = (annonce) => {
        setSelectedAnnonce(annonce);
    };

    useEffect(() => {
        fetch(`http://localhost:3001/categorie/${categorie}/${sousCategories}`)
        .then(response => response.json())
        .then(data => {
            setAnnonces(data);
            console.log('Données récupérées:', data);
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des données:', error);
        });
    }, [categorie, sousCategories]);

    return (
        <div className='arr-plan-categorie'>
            <div className='categorie_container'>
                <button id="fermeture" onClick={onClose}>X</button>
                <h1>{categorie}</h1>
                <h2>{sousCategories}</h2>
                <div className="sous-categories">
                    {annonces.map(annonce => (
                        <div 
                            onClick={() => handleAnnonceClick(annonce)} 
                            className="annonce" 
                            key={annonce.id}
                        >
                            <div className="user-container">
                                <img 
                                    src={annonce.author_pp || errorPP}
                                    alt={`Profile of ${annonce.author_idname}`} 
                                    id="image-user" 
                                    onError={handleImageErrorPP}
                                />
                                <p>User: {annonce.author_idname}</p>
                            </div>
                            <img 
                                src={'../public/'+annonce.image || errorImage}
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
                {selectedAnnonce && <AffichageAnnonce annonce={selectedAnnonce} onClose={() => setSelectedAnnonce(null)} />}
            </div>
        </div>
    );
}

export default Categorie;
