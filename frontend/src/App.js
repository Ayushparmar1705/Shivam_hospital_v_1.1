import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Home from "./pages/Home";
import About from "./pages/About";
import Gallery from "./pages/Gallery";
import Testimonials from "./pages/Testimonials";
import Contact from "./pages/Contact";
import Navbar from "./components/Navbar";
import ScrollReveal from "./components/ScrollReveal";

function SinglePageLayout() {
  const location = useLocation();

  // Listen to router navigation (clicking Links) and scroll to that section manually 
  useEffect(() => {
    const pathName = location.pathname.replace('/', '') || 'home';
    const element = document.getElementById(pathName);
    if (element) {
      setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    }
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
      <Navbar />
      <Routes>
        {/* We map all possible URL paths to the overarching layout, so direct links like /about load properly */}
        <Route path="/*" element={<SinglePageLayout />} />
      </Routes>
    </Router>
  );
}

export default App;