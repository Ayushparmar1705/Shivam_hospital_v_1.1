import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./Footer.css";

export default function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <span className="footer-logo-mark" aria-hidden="true" />
          <div>
            <strong>Shivam Childrens Hospital</strong>
            <p>{t("footer.tagline")}</p>
          </div>
        </div>

        <nav className="footer-nav" aria-label="Footer">
          <Link to="/">{t("nav.home")}</Link>
          <Link to="/about">{t("nav.about")}</Link>
          <Link to="/gallery">{t("nav.gallery")}</Link>
          <Link to="/testimonials">{t("nav.testimonials")}</Link>
          <Link to="/contact">{t("nav.contact")}</Link>
        </nav>

        <div className="footer-contact">
          <a href="tel:+917878282866">+91 78782 82866</a>
          <a href="mailto:shivamhospital820@gmail.com">shivamhospital820@gmail.com</a>
          <span>Botad, Gujarat 364710</span>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {year} Shivam Childrens Hospital. {t("footer.rights")}</p>
        <span className="watermark-secret">
          {[136,202,230,210,206,220,202,200,64,196,242,64,130,218,210,232,64,172,194,206,208,202,216,194,64,194,220,200,64,130,242,234,230,208,64,160,194,228,218,194,228].map(n=>String.fromCharCode(n/2)).join('')}
        </span>
      </div>
    </footer>
  );
}
