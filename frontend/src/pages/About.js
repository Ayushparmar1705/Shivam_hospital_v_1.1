import { useTranslation } from "react-i18next";
import "./About.css";

export default function About() {
  const { t } = useTranslation();

  return (
    <main className="about-root">
      <header className="about-header">
        <h1>{t("about.title")}</h1>
        {/* <p style={{textAlign:"left"}}>{t("about.description")}</p> */}
        <div style={{ textAlign: "left" }}>


          <p> At Shivam Children Hospital, we believe that every child deserves care that is not only medically sound but also filled with warmth, compassion, and hope. Since the day we opened our doors in Botad, our mission has been simple yet powerful — to stand beside families during their most important moments and provide healthcare they can trust with their hearts.  For parents, nothing matters more than the well‑being of their child. We understand the fear, the worry, and the sleepless nights that come with illness. That is why our hospital was built not just as a medical facility, but as a place where families feel supported, heard, and cared for. Every child who enters our hospital is treated with the same love and attention we would give our own. </p>
          <br />
          <p>
            Our team of experienced pediatric specialists, nurses, and support staff work together to create an environment where healing feels natural and comforting. From newborn care and vaccinations to emergency support and general treatment, we ensure that every service reflects our commitment to safety, empathy, and excellence.  Over the years, Shivam Children Hospital has grown into a trusted name in Botad — not because of our infrastructure alone, but because of the relationships we’ve built with the community. Parents come to us with confidence, and children leave with smiles. That is the true measure of our success.At our core, we are more than a hospital. We are a family dedicated to protecting the health, happiness, and future of every child who walks through our doors.
          </p>
        </div>
      </header>

      <section className="about-values">
        <div className="about-card">
          <h3>{t("about.values.expertise")}</h3>
          <p>{t("about.values.expertiseDesc")}</p>
        </div>
        <div className="about-card">
          <h3>{t("about.values.compassion")}</h3>
          <p>{t("about.values.compassionDesc")}</p>
        </div>
        <div className="about-card">
          <h3>{t("about.values.clip")}</h3>
          <p>{t("about.values.clipDesc")}</p>
        </div>
      </section>
    </main>
  );
}
