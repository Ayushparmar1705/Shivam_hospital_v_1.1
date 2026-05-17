import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import "./Gallery.css";

const images = [
  "/images/hospital1.jpeg",
  "/images/hospital2.jpeg",
  "/images/hospital3.jpeg",
  "/images/hospital4.jpeg",
  "/images/hospital5.jpeg",
  "/images/hospital6.jpeg"
];

export default function Gallery() {
  const { t } = useTranslation();
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (mobile) {
        setSelectedIndex(null);
        document.body.style.overflow = "auto";
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const openModal = (index) => {
    if (isMobile) return;
    setSelectedIndex(index);
  };

  const closeModal = () => setSelectedIndex(null);

  const showNext = () => {
    setSelectedIndex((prev) => (prev + 1) % images.length);
  };

  const showPrev = () => {
    setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleBackdropClick = (e) => {
    if (e.target.classList.contains("gallery-modal")) closeModal();
  };

  useEffect(() => {
    const onKey = (e) => {
      if (selectedIndex === null || isMobile) return;
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
    };

    if (selectedIndex !== null && !isMobile) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "auto";
    };
  }, [selectedIndex, isMobile]);

  return (
    <main className="gallery-root">
      <header className="gallery-header">
        <h1>{t("gallery.title")}</h1>
        <p>{t("gallery.subtitle")}</p>
      </header>

      <section className="gallery-grid">
        {images.map((src, idx) => (
          <div
            key={idx}
            className={`gallery-item ${isMobile ? "gallery-item-static" : ""}`}
            role={isMobile ? undefined : "button"}
            tabIndex={isMobile ? undefined : 0}
            onClick={() => openModal(idx)}
            onKeyDown={(e) =>
              !isMobile && (e.key === "Enter" || e.key === " ") && openModal(idx)
            }
            aria-label={isMobile ? undefined : `Open image ${idx + 1}`}
          >
            <img src={src} alt={`${t("gallery.imageAlt")} ${idx + 1}`} />
          </div>
        ))}
      </section>

      {!isMobile && selectedIndex !== null && (
        <div
          className="gallery-modal"
          onClick={handleBackdropClick}
          role="dialog"
          aria-modal="true"
        >
          <button
            className="gallery-modal-close"
            onClick={closeModal}
            aria-label="Close preview"
          >
            &times;
          </button>

          <button
            className="gallery-nav gallery-prev"
            onClick={showPrev}
            aria-label="Previous image"
          >
            ❮
          </button>

          <div className="gallery-modal-stage">
            <img
              src={images[selectedIndex]}
              alt={`${t("gallery.imageAlt")} ${selectedIndex + 1}`}
              className="gallery-large-img"
            />
          </div>

          <button
            className="gallery-nav gallery-next"
            onClick={showNext}
            aria-label="Next image"
          >
            ❯
          </button>
        </div>
      )}
    </main>
  );
}