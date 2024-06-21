import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h2>À propos</h2>
          <p>Votre texte À propos ici.</p>
        </div>
        <div className="footer-section links">
          <h2>Liens rapides</h2>
          <ul>
            <li><button type="button">Accueil</button></li>
            <li><button type="button">À propos</button></li>
            <li><button type="button">Contact</button></li>
          </ul>
        </div>
        <div className="footer-section contact-form">
          <h2>Contact</h2>
          <form action="#">
            <input type="email" name="email" className="text-input contact-input" placeholder="Votre adresse email"/>
            <textarea rows="4" name="message" className="text-input contact-input" placeholder="Votre message"></textarea>
            <button id="bouton_envoyer" type="submit" className="btn btn-primary">Envoyer</button>
          </form>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} Votre Site Web. Tous droits réservés.
      </div>
    </footer>
  );
}

export default Footer;
