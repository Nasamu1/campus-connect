import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Countdown from "../components/Countdown";
import EventCard from "../components/EventCard";
import Footer from "../components/Footer";
import EventFilter from "../components/EventFilter"; 
import "../App.css";
import Navbar from "../components/Navbar";

export default function Events() {
  const [isLoaded, setIsLoaded] = useState(false);
  const heroRef = useRef(null);
  const heroTextRef = useRef(null);

  const [events, setEvents] = useState([]);
  const [filters, setFilters] = useState({
    category: "All",
    dateFilter: "All",
    search: "",
    sortOrder: "none",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    fetch("/data/events.json")
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => console.error("Error loading events:", err));
  }, []);

  const filteredEvents = events
    .filter((event) => {
      const eventDate = new Date(event.date);

      if (filters.category !== "All" && event.category !== filters.category) {
        return false;
      }

      const today = new Date();
      if (filters.dateFilter === "Today") {
        if (
          eventDate.toDateString() !== today.toDateString()
        ) {
          return false;
        }
      } else if (filters.dateFilter === "Upcoming") {
        if (eventDate < today) return false;
      } else if (filters.dateFilter === "Past") {
        if (eventDate >= today) return false;
      }

      if (filters.startDate && eventDate < new Date(filters.startDate)) {
        return false;
      }
      if (filters.endDate && eventDate > new Date(filters.endDate)) {
        return false;
      }

      if (
        filters.search &&
        !event.title.toLowerCase().includes(filters.search.toLowerCase())
      ) {
        return false;
      }

      return true;
    })
    .sort((a, b) => {
      if (filters.sortOrder === "asc") {
        return a.title.localeCompare(b.title);
      } else if (filters.sortOrder === "desc") {
        return b.title.localeCompare(a.title);
      }
      return 0;
    });

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
            heroTextRef.current.style.transform = `translateY(${scrollY * 0.5}px)`;
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
              backgroundImage: "url('/assets/images/grad2.webp')",
              backgroundSize: "cover",
              backgroundPosition: "center",
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
              background: "rgba(0,0,0,0.55)",
              zIndex: 0, 
            }}
          />

          <div style={{ position: "relative", zIndex: 2 }}>
            <Navbar />
          </div>

            <div
              ref={heroTextRef}
              className="text-center my-auto px-4 mx-auto container"
              style={{ position: "relative", zIndex: 2 }}
            >
              <motion.h1
                className="display-3 fw-bold text-warning"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.1 }}
              >
                2025 Graduation
              </motion.h1>
              <motion.p
                className="lead mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35, duration: 0.9 }}
              >
                Join us in October to celebrate the achievements of our graduates
                and the bright futures ahead.
              </motion.p>
            </div>

            <div style={{ position: "relative", zIndex: 2 }}>
              <Countdown />
            </div>
          </header>

          <div className="container my-5">
            <h1 className="fw-bold text-center mb-4">Upcoming Events</h1>

            <EventFilter onFilter={setFilters} />

            <div className="row">
              {filteredEvents.length > 0 ? (
                filteredEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))
              ) : (
                <p className="text-center text-muted">No events found.</p>
              )}
            </div>
          </div>

          <Footer />
        </>
      )}
    </div>
  );
}
