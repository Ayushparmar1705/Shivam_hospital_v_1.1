import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { apiUrl } from "../config/api";
import SectionHeader from "../components/SectionHeader";

export default function Testimonials() {
  const { t } = useTranslation();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const getReviews = async () => {
    const result = await fetch('http://localhost:5000/api/reviews');
    const data = await result.json();
    console.log(data);
    setReviews(data.reviews);
    setLoading(false);
  }
  useEffect(() => {
    getReviews();
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