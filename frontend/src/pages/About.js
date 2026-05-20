import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SectionHeader from "../components/SectionHeader";

const STORY_PARAS = ["paragraph1", "paragraph2", "paragraph3"];
const TRUST_KEYS = ["trustPmjay", "trustNicu", "trustHours", "trustCommunity"];

export default function About() {
  const { t } = useTranslation();

  const values = [
    { key: "expertise", icon: "◆", featured: true },
    { key: "compassion", icon: "♥", featured: false },
    { key: "clip", icon: "✦", featured: false },
  ];

  const services = [
    "generalPediatrics",
    "nicu",
    "picu",
    "vaccination",
    "developmental",
    "growth",
    "pharmacy",
    "lab",
  ];

  const facilities = ["f1", "f2", "f3", "f4", "f5", "f6", "f7"];

  return (
    <main className="about-root page-section page-section--white">
      <div className="page-inner page-inner--wide">
        <SectionHeader
          wide
          eyebrow={t("about.eyebrow")}
          title={t("about.title")}
          subtitle={t("about.lead")}
        />

        <ul className="about-trust" aria-label="Hospital highlights">
          {TRUST_KEYS.map((key) => (
            <li key={key}>{t(`about.${key}`)}</li>
          ))}
        </ul>

        <article className="about-story">
          <div className="about-story-accent" aria-hidden="true" />
          <div className="about-story-content">
            {STORY_PARAS.map((key) => (
              <p key={key} className="about-prose">{t(`about.${key}`)}</p>
            ))}

            <aside className="about-pmjay glass-card" aria-label={t("about.pmjayTitle")}>
              <span className="about-pmjay-badge">{t("about.pmjayBadge")}</span>
              <p>{t("about.paragraph4")}</p>
            </aside>

            <blockquote className="about-quote">
              <p>{t("about.paragraph5")}</p>
            </blockquote>

            <p className="about-mission">{t("about.paragraph6")}</p>
            <p className="about-location">{t("about.locationNote")}</p>
          </div>
        </article>

        <section className="about-values-wrap" aria-labelledby="about-values-heading">
          <span className="about-block-eyebrow">{t("about.valuesEyebrow")}</span>
          <h2 id="about-values-heading" className="about-block-title">
            {t("about.valuesTitle")}
          </h2>
          <div className="about-values">
            {values.map(({ key, icon, featured }) => (
              <article
                key={key}
                className={`about-card elegant-card${featured ? " about-card--featured" : ""}`}
              >
                <span className="about-card-icon" aria-hidden="true">{icon}</span>
                <h3>{t(`about.values.${key}`)}</h3>
                <p>{t(`about.values.${key}Desc`)}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="about-doctor" aria-labelledby="about-doctor-heading">
          <div className="about-doctor-card elegant-card">
            <div className="about-doctor-badge" aria-hidden="true">
              <span className="about-doctor-icon">+</span>
            </div>
            <div className="about-doctor-info">
              <span className="about-block-eyebrow">{t("about.doctor.eyebrow")}</span>
              <h2 id="about-doctor-heading">{t("about.doctor.name")}</h2>
              <p className="about-doctor-quals">{t("about.doctor.qualifications")}</p>
              <p className="about-doctor-role">{t("about.doctor.specialization")}</p>
              <p className="about-doctor-bio">{t("about.doctor.bio")}</p>
            </div>
          </div>
        </section>

        <div className="about-lower-grid">
          <section className="about-block" aria-labelledby="about-services-heading">
            <span className="about-block-eyebrow">{t("about.services.eyebrow")}</span>
            <h2 id="about-services-heading" className="about-block-title">
              {t("about.services.title")}
            </h2>
            <p className="about-block-desc">{t("about.services.desc")}</p>
            <ul className="about-services">
              {services.map((key) => (
                <li key={key} className={`about-service-tag about-service-tag--${key}`}>
                  {t(`about.services.items.${key}`)}
                </li>
              ))}
            </ul>
          </section>

          <section className="about-block about-block--surface" aria-labelledby="about-facilities-heading">
            <span className="about-block-eyebrow">{t("about.facilities.eyebrow")}</span>
            <h2 id="about-facilities-heading" className="about-block-title">
              {t("about.facilities.title")}
            </h2>
            <p className="about-block-desc">{t("about.facilities.desc")}</p>
            <ul className="about-facilities">
              {facilities.map((key) => (
                <li key={key}>
                  <span className="about-facility-check" aria-hidden="true">✓</span>
                  {t(`about.facilities.items.${key}`)}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="about-cta-band glass-card">
          <div>
            <h2>{t("about.ctaTitle")}</h2>
            <p>{t("about.ctaDesc")}</p>
          </div>
          <Link className="cta-button cta-button--primary" to="/contact">
            {t("about.ctaButton")}
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
