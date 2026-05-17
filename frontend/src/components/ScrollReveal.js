import React, { useEffect, useRef, useState } from 'react';

export default function ScrollReveal({ children, name }) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    // We use a relatively low threshold (0.2) so even taller sections trigger 
    // when they enter the viewport cleanly
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          
          // Dynamically change the URL as the user scrolls into this section
          if (name) {
            const path = name === 'home' ? '/' : `/${name}`;
            if (window.location.pathname !== path) {
              window.history.replaceState(null, '', path);
            }
          }
        }
      });
    }, { threshold: 0.3 });

    const currentRef = domRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [name]);

  return (
    <div
      ref={domRef}
      id={name}
      className={`scroll-reveal ${isVisible ? 'is-visible' : ''}`}
    >
      {children}
    </div>
  );
}
