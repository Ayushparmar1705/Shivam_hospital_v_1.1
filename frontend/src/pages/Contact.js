import { useTranslation } from "react-i18next";
import "./Contact.css";

export default function Contact() {
  const { t } = useTranslation();

  return (
    <main className="contact-root">
      <header className="contact-header">
        <h1>{t("contact.title")}</h1>
        <p className="contact-subtitle">{t("contact.subtitle")}</p>
      </header>

      <section className="contact-map">
        <h3>{t("contact.mapTitle")}</h3>
        <div className="map-frame">
          <iframe
            title="Shivam Children Hospital location"
            src="https://www.google.com/maps?q=Shivam+Children+Hospital+Bharat+Society+Paliyad+Road+Botad&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>

      <section className="contact-grid">
        <div className="contact-card">
          <h3>{t("contact.hours")}</h3>
          <p>{t("contact.hoursValue").split('\n').map((line, idx) => (
            <span key={idx}>{line}<br /></span>
          ))}</p>
        </div>

        <div className="contact-card">
          <h3>{t("contact.address")}</h3>
          <p>Shivam Children Hospital Bharat Society, Paliyad Rd, Botad, Gujarat 364710, India</p>
          <a
            className="contact-link"
            href="https://maps.google.com/?q=Shivam+Children+Hospital+Bharat+Society+Paliyad+Road+Botad"
            target="_blank"
            rel="noreferrer"
          >
            {t("contact.mapLink")}
          </a>
        </div>

        <div className="contact-card">
          <h3>{t("contact.phone")}</h3>
          <p>
            <a className="contact-link" href="tel:+917878282866">
              +91 78782 82866
            </a>
          </p>


          <p>
            <a className="contact-link" href="tel:02849231444">
              02849231444
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
          <p></p><p></p><p></p>


          <h3>{t("contact.email")}</h3>
          <p>
            <a className="contact-link" href="mailto:shivamhospital820@gmail.com">
              shivamhospital820@gmail.com
            </a>
          </p>

          <p>Appointments available via phone only</p>
       

        </div>

        

        
      </section>
    </main>
  );
}
