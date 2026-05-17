import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "./Testimonials.css";

export default function Testimonials() {
  const { t } = useTranslation();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/reviews")
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .catch((err) => console.error("Error fetching reviews:", err));
  }, []);

  return (
    <main className="testimonials-root">
      <header className="testimonials-header">
        <h1>{t("testimonials.title")}</h1>
        <p>{t("testimonials.subtitle")}</p>
      </header>

      <section className="testimonials-grid">
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
    </main>
  );
}