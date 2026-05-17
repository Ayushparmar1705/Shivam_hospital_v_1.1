import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./Home.css";

export default function Home() {
  const { t } = useTranslation();

  const heroStyle = {
    backgroundImage: `linear-gradient(135deg, rgba(13, 148, 136, 0.9), rgba(15, 118, 110, 0.95)), url('${process.env.PUBLIC_URL}/images/img1.jpg')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  };

  return (
    <main className="home-root">
      <section className="home-section hero" style={heroStyle}>
        <div className="section-content">
          <h1>{t("home.welcome")}</h1>
          <p>{t("home.subtitle")}</p>
          <Link className="cta-button" to="/contact">
            {t("home.cta")}
          </Link>
        </div>
      </section>
    </main>
  );
}
