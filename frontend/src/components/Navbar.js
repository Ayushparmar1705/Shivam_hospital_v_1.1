import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import logo from "../assets/logo.jpeg";
import "./Navbar.css";

export default function Navbar() {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className="navbar">
      <Link to="/" className="logo">
        <img src={logo} alt="" className="logo-img" />
        <span className="logo-text">
          <strong>Shivam</strong>
          <small>Children&apos;s Hospital</small>
        </span>
      </Link>

      <button
        type="button"
        className="hamburger"
        onClick={() => setIsMenuOpen((o) => !o)}
        aria-expanded={isMenuOpen}
        aria-label="Toggle menu"
      >
        <span className={`hamburger-line ${isMenuOpen ? "open" : ""}`} />
        <span className={`hamburger-line ${isMenuOpen ? "open" : ""}`} />
        <span className={`hamburger-line ${isMenuOpen ? "open" : ""}`} />
      </button>

      <div className={`nav-container ${isMenuOpen ? "active" : ""}`}>
        <ul className="nav-links">
          <li><Link to="/">{t("nav.home")}</Link></li>
          <li><Link to="/about">{t("nav.about")}</Link></li>
          <li><Link to="/gallery">{t("nav.gallery")}</Link></li>
          <li><Link to="/testimonials">{t("nav.testimonials")}</Link></li>
          <li><Link to="/contact">{t("nav.contact")}</Link></li>
        </ul>
        <Link to="/contact" className="nav-cta">
          {t("nav.book")}
        </Link>
      </div>
    </header>
  );
}
