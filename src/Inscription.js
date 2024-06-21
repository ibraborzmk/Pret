import React, { useState } from 'react';
import './Inscription.css';

function Inscription({ onClose, onInscriptionSuccess }) {
    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("Les mots de passe ne correspondent pas!");
            return;
        }
        try {
            const response = await fetch('http://localhost:3001/inscription', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            if (data.success) {
                onClose(); // Ferme le formulaire après l'inscription réussie
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Erreur lors de l\'inscription:', error);
        }
    };

    return (
        <div className="modal-background">
            <div className="Inscription">
                <h1>Inscription</h1>
                <form onSubmit={handleSubmit}>
                    <label>
                        Nom :
                        <input type="text" name="nom" value={formData.nom} onChange={handleChange} />
                    </label>
                    <label>
                        Prénom :
                        <input type="text" name="prenom" value={formData.prenom} onChange={handleChange} />
                    </label>
                    <label>
                        Adresse email :
                        <input type="email" name="email" value={formData.email} onChange={handleChange} />
                    </label>
                    <label>
                        Nom d'utilisateur :
                        <input type="text" name="username" value={formData.username} onChange={handleChange} />
                    </label>
                    <label>
                        Mot de passe :
                        <input type="password" name="password" value={formData.password} onChange={handleChange} />
                    </label>
                    <label>
                        Confirmer le mot de passe :
                        <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
                    </label>
                    <div className="form-actions">
                        <input type="submit" value="Terminer l'inscription" />
                        <button type="button" onClick={onClose}>Annuler</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Inscription;
