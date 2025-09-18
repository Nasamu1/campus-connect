import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

import "../App.css";

export default function About() {
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
            heroRef.current.style.backgroundPosition = `center calc(100% + ${scrollY * 0.2}px)`;
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
    const timer = setTimeout(() => setIsLoaded(true), 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {isLoaded && (
        <>
          
          <header
            ref={heroRef}
            className="hero-section d-flex flex-column justify-content-between"
            style={{
              backgroundImage: "url('/assets/images/aboutbanner.webp')",
              backgroundSize: "cover",
              backgroundAttachment: "scroll",
              backgroundPosition: "top",
              height: "100vh",
              color: "#fff",
              position: "relative",
              overflow: "hidden",
            }}
          >
            
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(180deg, rgba(0, 0, 0, 0.6) 0%, rgba(0,0,0,0.4) 50%, rgba(0, 0, 0, 0.5) 100%)",
                zIndex: 0,
              }}
            />

            <Navbar />

            <div ref={heroTextRef} className="text-left my-auto px-4 mx-auto container text-center text-lg-start" style={{ position: "relative", zIndex: 2 }}>
              <motion.h1 className="display-3 fw-bold" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1 }}>
                About Vanguard University
              </motion.h1>
              <motion.p className="lead mb-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35, duration: 0.9 }}>
                Learn about our history, departments, and the vibrant events that shape campus life.
              </motion.p>
            </div>
          </header>

          
          <section className="py-5" style={{ backgroundColor: "#111", color: "#fff" }}>
            <div className="container">
              <div className="row align-items-center px-4 g-5">
                
                <div className="col-12 col-lg-6 text-center text-lg-start">
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    <h2 className="display-5 fw-bold mb-3 text-warning">Who We Are</h2>
                    <p className="lead mb-4">
                      Vanguard University is a forward-looking institution located in
                      Costa Mesa, California. Proudly affiliated with the Aptech Computer Education
                      , our campus has been recognized for innovation in
                      education, student leadership, and excellence in research.
                    </p>

                    <ul className="list-unstyled mb-4">
                      <li className="mb-2">
                        <i className="bi bi-geo-alt-fill text-warning me-2"></i>
                        Vanguard University, Costa Mesa, California
                      </li>
                      <li className="mb-2">
                        <i className="bi bi-award-fill text-warning me-2"></i>
                        Affiliated with the Aptech Computer Education
                      </li>
                      <li className="mb-2">
                        <i className="bi bi-star-fill text-warning me-2"></i>
                        Ranked among the Top 10 Innovative Universities in the U.S. (2024)
                      </li>
                      <li className="mb-2">
                        <i className="bi bi-mortarboard-fill text-warning me-2"></i>
                        Excellence Award for Student Development and Leadership
                      </li>
                    </ul>

                    <div className="d-flex flex-column flex-md-row gap-3 justify-content-center justify-content-lg-start">
                      
                      <Link to="/contact" className="btn btn-outline-light btn-lg">
                        Contact Admissions
                      </Link>
                    </div>
                  </motion.div>
                </div>

               
                <div className="col-12 col-lg-6">
                  <motion.img
                    src="/assets/images/about-campus.webp"
                    alt="Campus life"
                    className="img-fluid rounded shadow"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.9 }}
                  />
                </div>
              </div>
            </div>
          </section>

       
              
          <section className="py-5" style={{ backgroundColor: "#f8f9fa", color: "#111" }}>
            <div className="container text-center">
              <motion.h2
                className="display-5 fw-bold mb-2 text-dark"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                Annual Events at Vanguard
                <div 
                  className="my-2"
                  style={{
                  height:"5px",
                  width: "100px",
                  backgroundColor: "#ffc107",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "0 auto",  
                }}></div>
              </motion.h2>
              <p className="lead mb-4 fw-semibold text-muted">
                A vibrant calendar of events that celebrate technology, culture, sports,
                and community service across the year.
              </p>

              <div className="row g-4 px-3">
                
                <div className="col-12 col-md-4">
                  <motion.div
                    className="p-4 rounded bg-white shadow-sm h-100 d-flex flex-column align-items-center text-center"
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <i className="bi bi-laptop text-warning fs-2 mb-3"></i>
                    <h5 className="fw-bold mb-2">Technical Events</h5>
                    <p className="small text-dark mb-3">
                      Hackathons, robotics, and exhibitions showcasing student innovation, creativity, and problem-solving excellence.
                    </p>
                    <ul className="list-unstyled fw-semibold small text-dark mb-3">
                      <li>• Code Clash – February</li>
                      <li>• TechFest – March</li>
                      <li>• Robotics Championship – July</li>
                    </ul>
                  </motion.div>
                </div>

                <div className="col-12 col-md-4">
                  <motion.div
                    className="p-4 rounded bg-white shadow-sm h-100 d-flex flex-column align-items-center text-center"
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <i className="bi bi-music-note-beamed text-warning fs-2 mb-3"></i>
                    <h5 className="fw-bold mb-2">Cultural Events</h5>
                    <p className="small text-dark mb-3">
                      Music, dance, and festivals that highlight student talent, diversity, and vibrant campus spirit.
                    </p>
                    <ul className="list-unstyled fw-semibold small text-dark mb-3">
                      <li>• Cultural Fusion Fest – January</li>
                      <li>• Music Gala – June</li>
                      <li>• Annual Day – April</li>
                    </ul>
                  </motion.div>
                </div>

                <div className="col-12 col-md-4">
                  <motion.div
                    className="p-4 rounded bg-white shadow-sm h-100 d-flex flex-column align-items-center text-center"
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <i className="bi bi-trophy text-warning fs-2 mb-3"></i>
                    <h5 className="fw-bold mb-2">Sports & Community</h5>
                    <p className="small text-dark mb-3">
                      Sports meets, drives, and alumni gatherings that build unity, pride, and lifelong connections.
                    </p>
                    <ul className="list-unstyled fw-semibold small text-dark mb-3">
                      <li>• Momentum – September</li>
                      <li>• Blood Donation Drive – March</li>
                      <li>• Alumni Meet – November</li>
                    </ul>
                  </motion.div>
                </div>
              </div>

              <div className="mt-5">
                <Link to="/events" className="btn btn-warning btn-lg fw-bold">
                  View All Events
                </Link>
              </div>
            </div>
          </section>

          <section className="py-5" style={{ backgroundColor: "#111", color: "#fff" }}>
            <div className="container text-center">
              <h2 className="display-5 fw-bold mb-4 text-warning">
                Academic Departments
              </h2>
              <p className="lead mb-5 text-light">
                Vanguard University offers diverse programs through specialized departments, 
                fostering innovation, creativity, and excellence across disciplines.
              </p>

              <div className="row g-4">
                {[
                  { icon: "bi bi-cpu", title: "Computer Science" },
                  { icon: "bi bi-bar-chart", title: "Business & Management" },
                  { icon: "bi bi-brush", title: "Fine Arts & Media" },
                  { icon: "bi bi-book", title: "English & Humanities" },
                  { icon: "bi bi-people", title: "Social Sciences" },
                  { icon: "bi bi-heart-pulse", title: "Health Sciences" },
                  { icon: "bi bi-tree", title: "Environmental Science" },
                  { icon: "bi bi-dribbble", title: "Physical Education" },
                ].map((dept, i) => (
                  <div className="col-6 col-md-3" key={i}>
                    <div className="p-4 bg-dark rounded shadow h-100 d-flex flex-column justify-content-center align-items-center">
                      <i className={`${dept.icon} text-warning fs-1 mb-3`}></i>
                      <h5 className="fw-bold">{dept.title}</h5>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>



          <Footer/>



          
        </>
      )}
    </div>
  );
}
