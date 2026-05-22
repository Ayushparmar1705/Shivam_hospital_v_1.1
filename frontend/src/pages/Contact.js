import { useTranslation } from "react-i18next";
import SectionHeader from "../components/SectionHeader";

export default function Contact() {
  const { t } = useTranslation();

  return (
    <main className="contact-root page-section page-section--cream">
      <div className="page-inner">
        <SectionHeader
          eyebrow={t("contact.eyebrow")}
          title={t("contact.title")}
          subtitle={t("contact.subtitle")}
        />

        <section className="contact-map">
          <h2 className="contact-map-title">{t("contact.mapTitle")}</h2>
          <div className="map-frame">
            <iframe
              title="Shivam Children Hospital location"
              src="https://www.google.com/maps?q=Shivam+Children+Hospital+Bharat+Society+Paliyad+Road+Botad&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </section>

        <section className="contact-grid">
          <article className="contact-card elegant-card">
            <span className="contact-card-icon" aria-hidden="true">◷</span>
            <h3>{t("contact.hours")}</h3>
            <p className="contact-hours">
              {t("contact.hoursValue")
                .split("\n")
                .map((line, idx) => (
                  <span key={idx}>
                    {line}
                    <br />
                  </span>
                ))}
            </p>
          </article>

          <article className="contact-card elegant-card">
            <span className="contact-card-icon" aria-hidden="true">◎</span>
            <h3>{t("contact.address")}</h3>
            <p>
              Shivam Children Hospital, Bharat society, Paliyad Rd, Botad,
              Gujarat 364710, India
            </p>
            <a
              className="contact-link"
              href="https://maps.google.com/?q=Shivam+Children+Hospital+Bharat+Society+Paliyad+Road+Botad"
              target="_blank"
              rel="noreferrer"
            >
              {t("contact.mapLink")}
            </a>
          </article>

          <article className="contact-card elegant-card">
            <span className="contact-card-icon" aria-hidden="true">☎</span>
            <h3>{t("contact.phone")}</h3>
            <p>
              <a className="contact-link contact-link--inline" href="tel:+917878282866">
                +91 78782 82866
              </a>
            </p>
            <p>
              <a className="contact-link contact-link--inline" href="tel:02849231444">
                02849 231444
              </a>
            </p>
            <p>
              <a
                className="contact-link"
                href="https://wa.me/+917878282866"
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp
              </a>
            </p>

            <h3 className="contact-card-subhead">{t("contact.email")}</h3>
            <p>
              <a className="contact-link contact-link--inline" href="mailto:shivamhospital820@gmail.com">
                shivamhospital820@gmail.com
              </a>
            </p>
            <p className="contact-note">{t("contact.appointmentNote")}</p>
          </article>
        </section>
      </div>
    </main>
  );
}
