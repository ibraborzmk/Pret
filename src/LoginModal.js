import React, { useState } from 'react';
import './LoginModal.css';
import PropTypes from 'prop-types';

const LoginModal = ({ onClose, onLoginSuccess, onOpenSignUp }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();

      if (data.success) {
        onLoginSuccess(data.userId);
        onClose();
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('Erreur de connexion au serveur');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-background">
      <div className="modal-content">
        <h2>Connexion</h2>
        <form onSubmit={handleLogin}>
          <label htmlFor="username">Nom d'utilisateur</label>
          <input type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
          <label htmlFor="password">Mot de passe</label>
          <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit" disabled={loading}>{loading ? 'Connexion...' : 'Se connecter'}</button>
          {error && <p className="error">{error}</p>}
        </form>
        <button onClick={onClose}>Fermer</button>
        {/* Modification ici pour inclure onClose dans l'action du bouton S'inscrire */}
        <button onClick={() => { onOpenSignUp(); onClose(); }}>S'inscrire</button>
      </div>
    </div>
);

};

LoginModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    onLoginSuccess: PropTypes.func.isRequired,
    onOpenSignUp: PropTypes.func.isRequired  // Nouvelle prop pour ouvrir la fenêtre d'inscription
};

LoginModal.defaultProps = {
    onClose: () => console.warn('onClose not provided'),
    onLoginSuccess: () => console.warn('onLoginSuccess not provided'),
    onOpenSignUp: () => console.warn('onOpenSignUp not provided')  // Définition par défaut pour la nouvelle prop
};

export default LoginModal;
