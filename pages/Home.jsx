import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import EventSpotlight from "/src/components/EventSpotlight";
import Countdown from "/src/components/Countdown";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

import "../App.css";

const Home = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const heroRef = useRef(null);
  const heroTextRef = useRef(null);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          if (heroRef.current) {
            heroRef.current.style.backgroundPosition = `center ${scrollY * 0.2}px`;
          }
          if (heroTextRef.current) {
            heroTextRef.current.style.transform = `translateY(${scrollY * 0.5}px) translateZ(0)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {isLoaded && (
        <header
          ref={heroRef}
          className="hero-section d-flex flex-column justify-content-between"
          style={{
            backgroundImage: "url('/assets/images/hero_image3.webp')",
            backgroundSize: "cover",
            backgroundAttachment: "scroll",
            backgroundPosition: "top",
            height: "100vh",
            color: "#fff",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div className="overlay"></div>
          <Navbar />




          <div
            ref={heroTextRef}
            className="text-left my-auto px-4 mx-auto container"
            style={{ position: "relative", zIndex: 1 }}
          >
            <motion.p
              className="text-uppercase mb-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              style={{ color: "#ffc107", letterSpacing: "2px" }}
            >
              Discover • Connect • Celebrate
            </motion.p>
            <motion.h1
              className="display-3 fw-bold"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2 }}
            >
              Welcome to Vanguard
            </motion.h1>
            <motion.p
              className="lead mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              Explore events, relive memories in our gallery, and stay connected with your college community.
            </motion.p>
            <Link to="/events" className="btn btn-outline-warning btn-lg fw-bold">
              Explore Events
            </Link>
          </div>

          <div className="d-flex justify-content-between px-4 pb-3" style={{ zIndex: 1 }}>
            <div>
              <i className="bi bi-twitter mx-2"></i>
              <i className="bi bi-facebook mx-2"></i>
              <i className="bi bi-instagram mx-2"></i>
            </div>
            <div className="text-warning">
              <i className="bi bi-geo-alt-fill"></i> Vangaurd University
            </div>
          </div>

          
        </header>
      )}

      {isLoaded && (
      <>
        <section
        id="choose"
        style={{
          position: "relative",
          minHeight: "100vh",
          overflow: "hidden",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "stretch",
          margin: "0",
          padding: "0",
          backgroundColor: "#111",
        }}
      >
       
        <div
          className="choose-text col-12 col-lg-6"
          style={{
            color: "#fff",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "3rem",
            zIndex: 2,
          }}
        >
          <h2 className="display-5 fw-bold mb-4 text-warning text-center text-lg-start">
            Choose Vanguard
          </h2>
          <p className="lead mb-4 text-center text-lg-start">
            At Vanguard University, we pride ourselves on excellence, innovation, and
            community. Our vibrant campus culture inspires students to discover their
            passions, connect with peers, and celebrate lifelong achievements.
          </p>

          
          <ul className="list-unstyled d-none d-lg-block">
            <li className="mb-3">
              <i className="bi bi-check-circle-fill me-2 text-warning"></i>
              World-class academic programs tailored for the future.
            </li>
            <li className="mb-3">
              <i className="bi bi-check-circle-fill me-2 text-warning"></i>
              Thriving student life filled with events and connections.
            </li>
            <li className="mb-3">
              <i className="bi bi-check-circle-fill me-2 text-warning"></i>
              Supportive faculty and alumni network.
            </li>
          </ul>

          <div className="text-center text-lg-start">
            <Link to="/about" className="btn btn-outline-warning btn-lg fw-bold mt-3">
              Learn More
            </Link>
          </div>
        </div>

        
        <div
          className="choose-image col-12 col-lg-6"
          style={{
            backgroundImage: "url('/assets/images/choose.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "300px",
          }}
        ></div>
      </section>
  

       
        <EventSpotlight />

        <Countdown />
        
        <Footer />

      </>
    )}

    
    </div>
  );
};

export default Home;
