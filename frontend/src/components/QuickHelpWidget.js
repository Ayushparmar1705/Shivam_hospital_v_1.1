import { useState } from "react";
import { useTranslation } from "react-i18next";
import "./QuickHelpWidget.css";

export default function QuickHelpWidget() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleWidget = () => {
    setIsOpen(!isOpen);
    // Reset active FAQ when closing/opening
    setActiveFaq(null);
  };

  const handleFaqClick = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="quick-help-wrapper">
      {/* Floating Panel (visible when open) */}
      <div className={`quick-help-panel ${isOpen ? "is-open" : ""}`}>
        <div className="quick-help-header">
          <div className="quick-help-header-title">
            <span className="quick-help-icon-sparkle" role="img" aria-label="sparkles">✨</span>
            <div>
              <h3>{t("faq.widgetTitle")}</h3>
              <p>{t("faq.widgetSubtitle")}</p>
            </div>
          </div>
          <button 
            type="button" 
            className="quick-help-close-btn" 
            onClick={toggleWidget}
            aria-label="Close Quick Help"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="quick-help-body">
          <div className="quick-help-faq-list">
            {["1", "2", "3", "4"].map((num, idx) => {
              const isItemOpen = activeFaq === idx;
              return (
                <div 
                  key={num} 
                  className={`quick-help-faq-item ${isItemOpen ? "is-active" : ""}`}
                >
                  <button 
                    type="button"
                    className="quick-help-faq-trigger" 
                    onClick={() => handleFaqClick(idx)}
                    aria-expanded={isItemOpen}
                  >
                    <span>{t(`faq.q${num}`)}</span>
                    <span className="quick-help-faq-chevron">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </span>
                  </button>
                  <div className="quick-help-faq-content">
                    <p>{t(`faq.a${num}`)}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="quick-help-footer">
          <a href="tel:+917878282866" className="quick-help-call-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.5 19.5 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
            <span>{t("home.callNow")}</span>
          </a>
        </div>
      </div>

      {/* Floating Toggle Button */}
      <button 
        type="button" 
        className={`quick-help-toggle-btn ${isOpen ? "is-active" : ""}`}
        onClick={toggleWidget}
        aria-label="Toggle Quick Help"
        title={t("faq.widgetTitle")}
      >
        <span className="quick-help-toggle-icon">
          {isOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
          )}
        </span>
      </button>
    </div>
  );
}
