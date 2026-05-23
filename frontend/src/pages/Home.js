import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import logo from "../assets/logo.jpeg";
import "./Home.css";

const EXCELLENCE = ["nicu", "picu", "vaccine", "emergency"];
const PILLARS = [
  { key: 1, to: "/about" },
  { key: 2, to: "/contact" },
  { key: 3, to: "/testimonials" },
];
const STEPS = ["step1", "step2", "step3"];
const TRUST = ["trustPicu", "trustNicu", "trustHours", "trustCommunity"];

const heroBg = `${process.env.PUBLIC_URL}/images/img1.jpg`;

export default function Home() {
  const { t } = useTranslation();

  return (
    <main className="home">
      <section className="home-hero">
        <div
          className="home-hero-bg"
          style={{ backgroundImage: `url('${heroBg}')` }}
          aria-hidden="true"
        />
        <div className="home-hero-overlay" aria-hidden="true" />

        <div className="page-inner home-hero-grid">
          <div className="home-hero-text">
            <span className="eyebrow">{t("home.badge")}</span>
            <h1 className="display-xl">
              {t("home.welcomeLine1")}
              <span className="home-hero-accent">{t("home.welcomeLine2")}</span>
            </h1>
            <p className="lead">{t("home.subtitle")}</p>
            <div className="home-hero-actions">
              <Link className="cta-button cta-button--primary" to="/contact">
                {t("home.cta")}
              </Link>
              <Link className="cta-button cta-button--secondary" to="/about">
                {t("home.ctaSecondary")}
              </Link>
            </div>
            <ul className="home-trust-chips">
              {TRUST.map((key) => (
                <li key={key}>{t(`about.${key}`)}</li>
              ))}
            </ul>
            <p className="home-trust-headline">{t("home.trustHeadline")}</p>
          </div>

          <div className="home-hero-card" aria-label="Hospital highlights">
            <div className="home-hero-logo-wrap">
              <img src={logo} alt="Shivam Children Hospital" className="home-hero-logo" />
            </div>
            <p className="home-hero-card-tagline">{t("home.tagline")}</p>
            <ul className="home-hero-stats">
              <li>
                <strong>{t("home.stat1Value")}</strong>
                <span>{t("home.stat1Label")}</span>
              </li>
              <li>
                <strong>{t("home.stat2Value")}</strong>
                <span>{t("home.stat2Label")}</span>
              </li>
              <li>
                <strong>{t("home.stat3Value")}</strong>
                <span>{t("home.stat3Label")}</span>
              </li>
            </ul>
            <p className="home-hero-card-note">{t("home.cardFooter")}</p>
          </div>
        </div>
      </section>

      <section className="page-section page-section--white">
        <div className="page-inner">
          <div className="home-section-intro">
            <span className="eyebrow">{t("home.excellenceEyebrow")}</span>
            <h2 className="display-lg">{t("home.excellenceTitle")}</h2>
            <p className="lead">{t("home.excellenceLead")}</p>
          </div>
          <div className="home-excellence">
            {EXCELLENCE.map((key) => (
              <article key={key} className="home-excellence-item elegant-card">
                <span className={`home-ex-icon home-ex-icon--${key}`} aria-hidden="true" />
                <h3>{t(`home.excellence.${key}.title`)}</h3>
                <p>{t(`home.excellence.${key}.desc`)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section page-section--cream">
        <div className="page-inner">
          <div className="home-pillars">
            {PILLARS.map(({ key, to }) => (
              <Link key={key} to={to} className="home-pillar elegant-card">
                <span className="home-pillar-num">0{key}</span>
                <h3>{t(`home.feature${key}Title`)}</h3>
                <p>{t(`home.feature${key}Desc`)}</p>
                <span className="home-pillar-link">{t("home.learnMore")} →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section page-section--white">
        <div className="page-inner home-doctor-block">
          <div className="home-doctor-copy">
            <span className="eyebrow">{t("home.showcaseEyebrow")}</span>
            <h2 className="display-lg">{t("home.showcaseTitle")}</h2>
            <p className="lead">{t("home.showcaseLead")}</p>
            <ul className="home-checklist">
              <li>{t("home.showcaseL1")}</li>
              <li>{t("home.showcaseL2")}</li>
              <li>{t("home.showcaseL3")}</li>
            </ul>
            <Link className="cta-button cta-button--primary" to="/about">
              {t("home.ctaSecondary")}
            </Link>
          </div>
          <aside className="home-doctor-card elegant-card">
            <div className="home-doctor-avatar" aria-hidden="true">
              <span>JV</span>
            </div>
            <p className="home-doctor-eyebrow">{t("about.doctor.eyebrow")}</p>
            <h3>{t("about.doctor.name")}</h3>
            <p className="home-doctor-meta">{t("about.doctor.qualifications")}</p>
            <p className="home-doctor-role">{t("home.doctorRole")}</p>
            <p className="home-doctor-bio">{t("about.doctor.bio")}</p>
          </aside>
        </div>
      </section>

      <section className="page-section page-section--mint">
        <div className="page-inner">
          <div className="home-section-intro home-section-intro--center">
            <span className="eyebrow">{t("home.journeyEyebrow")}</span>
            <h2 className="display-lg">{t("home.journeyTitle")}</h2>
          </div>
          <div className="home-steps">
            {STEPS.map((key, i) => (
              <article key={key} className="home-step elegant-card">
                <span className="home-step-num">{i + 1}</span>
                <h3>{t(`home.${key}Title`)}</h3>
                <p>{t(`home.${key}Desc`)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>


      <section className="page-section">
        <div className="page-inner">
          <div className="home-cta elegant-card">
            <div>
              <span className="eyebrow">{t("home.ctaEyebrow")}</span>
              <h2 className="display-lg">{t("home.ctaBandTitle")}</h2>
              <p className="lead">{t("home.ctaBandSubtitle")}</p>
            </div>
            <div className="home-cta-btns">
              <a className="cta-button cta-button--primary" href="tel:+917878282866">
                {t("home.callNow")}
              </a>
              <Link className="cta-button cta-button--secondary" to="/contact">
                {t("home.cta")}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
