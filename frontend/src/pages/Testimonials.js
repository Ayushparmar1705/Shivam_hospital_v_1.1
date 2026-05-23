import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import SectionHeader from "../components/SectionHeader";

export default function Testimonials() {
  const { t } = useTranslation();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("https://shivam-hospital-git-25cceb-shivam-children-hospital-s-projects.vercel.app/api/reviews")
      .then((res) => res.json())
      .then((data) => setReviews(Array.isArray(data) ? data : []))
      .catch((err) => console.error("Error fetching reviews:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="testimonials-root page-section page-section--white">
      <div className="page-inner">
        <SectionHeader
          eyebrow={t("testimonials.eyebrow")}
          title={t("testimonials.title")}
          subtitle={t("testimonials.subtitle")}
        />

        <section className="testimonials-grid">
          {loading && (
            <p className="testimonials-status">{t("testimonials.loading")}</p>
          )}
          {!loading && reviews.length === 0 && (
            <p className="testimonials-status">{t("testimonials.empty")}</p>
          )}
          {reviews.map((item, idx) => (
            <article key={idx} className="testimonial-card">
              {/* Review Text */}
              <p className="testimonial-quote">“{item.snippet}”</p>

              {/* Author Info */}
              <div className="testimonial-author">
                <span className="testimonial-name">{item.user?.name}</span>
                <span className="testimonial-role">Google Review</span>
              </div>

              {/* Optional: Stars */}
              <div className="testimonial-stars">
                {"⭐".repeat(item.rating)}
              </div>

              {/* Optional: Date */}
              <p className="testimonial-date">{item.date}</p>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}