import React, { useContext, useState } from 'react';
import { AuthContext } from './AuthContext';
import LoginModal from './LoginModal';
import StatisticsComponent from './StatisticsComponent';
import './bande-image.css';

function ImageComponent({ src, alt }) {
  const { userId } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleJoinClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="image-container">
      <img src={src} alt={alt} />
      {!userId && (
        <div className="text-image-container">
          <p>Rejoignez-nous pour partager avec nous les outils</p>
          <button onClick={handleJoinClick}>Rejoindre</button>
        </div>
      )}
      {isModalOpen && <LoginModal onClose={handleCloseModal} onLoginSuccess={handleCloseModal} />}
      {userId && <StatisticsComponent />}

    </div>
    
  );
}

export default ImageComponent;
