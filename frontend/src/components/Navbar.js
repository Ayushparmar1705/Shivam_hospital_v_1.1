import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import logo from "../assets/logo.jpeg";

// import LanguageSwitcher from "./LanguageSwitcher";
import "./Navbar.css";

export default function Navbar() {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <img src={logo} alt="Shivam Childrens Hospital Logo" className="logo-img" />
        Shivam Childrens Hospital
      </div>


      <button className="hamburger" onClick={toggleMenu} aria-label="Toggle menu">
        <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
        <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
        <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
      </button>

      <div className={`nav-container ${isMenuOpen ? 'active' : ''}`}>
        <ul className="nav-links">
          {/* We switch back to purely using Links so that React Router catches it and triggers the scroll jump */}
          <li><Link to="/" onClick={closeMenu}>{t('nav.home')}</Link></li>
          <li><Link to="/about" onClick={closeMenu}>{t('nav.about')}</Link></li>
          <li><Link to="/gallery" onClick={closeMenu}>{t('nav.gallery')}</Link></li>
          <li><Link to="/testimonials" onClick={closeMenu}>{t('nav.testimonials')}</Link></li>
          <li><Link to="/contact" onClick={closeMenu}>{t('nav.contact')}</Link></li>
        </ul>
        {/* <LanguageSwitcher /> */}
      </div>
    </nav>
  );
}