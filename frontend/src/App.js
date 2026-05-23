import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Home from "./pages/Home";
import About from "./pages/About";
import Gallery from "./pages/Gallery";
import Testimonials from "./pages/Testimonials";
import Contact from "./pages/Contact";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollReveal from "./components/ScrollReveal";
import LanguageGate from "./components/LanguageGate";
import QuickHelpWidget from "./components/QuickHelpWidget";

function SinglePageLayout() {
  const location = useLocation();

  // Listen to router navigation (clicking Links) and scroll to that section manually 
  useEffect(() => {
    const pathName = location.pathname.replace("/", "") || "home";
    const element = document.getElementById(pathName);
    if (!element) return;

    element.classList.add("is-visible");

    const scrollToSection = () => {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    requestAnimationFrame(() => {
      requestAnimationFrame(scrollToSection);
    });
  }, [location]);

  return (
    <div className="single-page-layout">
      <ScrollReveal name="home"><Home /></ScrollReveal>
      <ScrollReveal name="about"><About /></ScrollReveal>
      <ScrollReveal name="gallery"><Gallery /></ScrollReveal>
      <ScrollReveal name="testimonials"><Testimonials /></ScrollReveal>
      <ScrollReveal name="contact"><Contact /></ScrollReveal>
    </div>
  );
}

function App() {
  return (
    <Router>
      <LanguageGate />
      <QuickHelpWidget />
      <Navbar />
      <Routes>
        <Route path="/*" element={<SinglePageLayout />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;