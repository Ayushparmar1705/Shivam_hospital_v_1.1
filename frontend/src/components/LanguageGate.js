import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import logo from "../assets/logo.jpeg";
import "./LanguageGate.css";

export default function LanguageGate() {
  const { i18n } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Check if preferred language is already set
    const savedLanguage = sessionStorage.getItem("preferredLanguage");
    if (!savedLanguage) {
      setIsVisible(true);
    }
  }, []);

  const selectLanguage = (lang) => {
    setIsExiting(true);
    // Smooth transition before unmounting
    setTimeout(() => {
      sessionStorage.setItem("preferredLanguage", lang);
      sessionStorage.setItem("showLanguageTooltip", "true");
      i18n.changeLanguage(lang);
      setIsVisible(false);
    }, 450); // Matches CSS transition duration
  };

  if (!isVisible) return null;

  return (
    <div className={`language-gate-backdrop ${isExiting ? "exit-fade" : ""}`}>
      <div className={`language-gate-card ${isExiting ? "exit-scale" : ""}`}>
        <div className="language-gate-logo-wrap">
          <img src={logo} alt="Shivam Children Hospital Logo" className="language-gate-logo" />
        </div>
        
        <h1 className="language-gate-title">Shivam</h1>
        <p className="language-gate-subtitle">Children&apos;s Hospital</p>

        <div className="language-gate-divider" />

        <p className="language-gate-prompt">Choose Your Language</p>
        <p className="language-gate-prompt-sub">તમારી ભાષા પસંદ કરો &bull; अपनी भाषा चुनें</p>

        <div className="language-gate-options">
          <button
            type="button"
            className="language-gate-btn btn-en"
            onClick={() => selectLanguage("en")}
            aria-label="Select English"
          >
            <span className="lang-native">English</span>
            <span className="lang-eng">English</span>
          </button>
          
          <button
            type="button"
            className="language-gate-btn btn-gu"
            onClick={() => selectLanguage("gu")}
            aria-label="Select Gujarati"
          >
            <span className="lang-native">ગુજરાતી</span>
            <span className="lang-eng">Gujarati</span>
          </button>

          <button
            type="button"
            className="language-gate-btn btn-hi"
            onClick={() => selectLanguage("hi")}
            aria-label="Select Hindi"
          >
            <span className="lang-native">हिंदी</span>
            <span className="lang-eng">Hindi</span>
          </button>
        </div>

        <p className="language-gate-footer">
          You can change your language preference anytime from the header menu.
        </p>
      </div>
    </div>
  );
}
