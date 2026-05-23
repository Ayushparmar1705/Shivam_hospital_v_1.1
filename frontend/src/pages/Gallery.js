import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import SectionHeader from "../components/SectionHeader";

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
  
  // Touch swipe states
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const minSwipeDistance = 50;

  const openModal = (index) => {
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
    if (e.target.classList.contains("gallery-modal") || e.target.classList.contains("gallery-modal-stage")) {
      closeModal();
    }
  };

  // Swipe detection handlers
  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      showNext();
    } else if (isRightSwipe) {
      showPrev();
    }
  };

  useEffect(() => {
    const onKey = (e) => {
      if (selectedIndex === null) return;
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
    };

    if (selectedIndex !== null) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "auto";
    };
  }, [selectedIndex]);

  return (
    <main className="gallery-root page-section page-section--mint">
      <div className="page-inner">
        <SectionHeader
          eyebrow={t("gallery.eyebrow")}
          title={t("gallery.title")}
          subtitle={t("gallery.subtitle")}
        />

        <section className="gallery-grid">
          {images.map((src, idx) => (
            <div
              key={idx}
              className="gallery-item"
              role="button"
              tabIndex={0}
              onClick={() => openModal(idx)}
              onKeyDown={(e) =>
                (e.key === "Enter" || e.key === " ") && openModal(idx)
              }
              aria-label={`Open image ${idx + 1}`}
            >
              <img src={src} alt={`${t("gallery.imageAlt")} ${idx + 1}`} />
            </div>
          ))}
        </section>

        {selectedIndex !== null && (
          <div
            className="gallery-modal"
            onClick={handleBackdropClick}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
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
      </div>
    </main>
  );
}