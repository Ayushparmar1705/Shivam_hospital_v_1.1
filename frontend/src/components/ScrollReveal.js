import React, { useEffect, useRef, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";

function isInViewport(el) {
  const rect = el.getBoundingClientRect();
  const margin = 120;
  return rect.top < window.innerHeight - margin && rect.bottom > margin;
}

export default function ScrollReveal({ children, name }) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef(null);
  const location = useLocation();

  const reveal = useCallback(() => setIsVisible(true), []);

  const sectionPath = name === "home" ? "/" : `/${name}`;
  const isNavigatedHere =
    location.pathname === sectionPath ||
    (name === "home" && location.pathname === "/");

  // Navbar / direct URL: show section immediately, don't wait for scroll threshold
  useEffect(() => {
    if (isNavigatedHere) {
      reveal();
    }
  }, [isNavigatedHere, reveal]);

  useEffect(() => {
    const el = domRef.current;
    if (!el) return;

    if (isInViewport(el)) {
      reveal();
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      reveal();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          reveal();

          if (name) {
            const path = name === "home" ? "/" : `/${name}`;
            if (window.location.pathname !== path) {
              window.history.replaceState(null, "", path);
            }
          }
        });
      },
      {
        threshold: [0, 0.05, 0.12],
        rootMargin: "200px 0px 200px 0px",
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [name, reveal]);

  return (
    <div
      ref={domRef}
      id={name}
      className={`scroll-reveal ${isVisible ? "is-visible" : ""}`}
    >
      {children}
    </div>
  );
}
