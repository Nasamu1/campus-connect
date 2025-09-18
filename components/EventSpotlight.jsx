import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

export default function EventSpotlight() {
  const [events, setEvents] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const url = "/data/events.json?v=" + Date.now();
    fetch(url, { cache: "no-store" })
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        console.log("events.json loaded", data);
        const arr = Array.isArray(data) ? data : [];
        setEvents(arr.slice(0, 4));
      })
      .catch((err) => {
        console.error("Error loading events.json:", err);
      });
  }, []);

  useEffect(() => {
    if (events.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((p) => (p + 1) % events.length);
    }, 9000);
    return () => clearInterval(interval);
  }, [events]);

  if (events.length === 0) return null;

  const event = events[currentIndex];

  function parseToDate(value) {
    if (!value) return null;
    const s = String(value).trim();
    if (!s) return null;
    const d = new Date(s);
    if (!isNaN(d)) return d;
    const n = Number(s);
    if (!isNaN(n)) return new Date(n);
    const p = Date.parse(s);
    if (!isNaN(p)) return new Date(p);
    return null;
  }

  const rawDate = event.date ?? event.start ?? event.datetime ?? null;
  const parsed = parseToDate(rawDate);
  const formattedDate = parsed
    ? parsed.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "TBA";

  return (
    <section
      className="event-spotlight d-flex align-items-center"
      style={{
        minHeight: "100vh",
        backgroundColor: "#e9e9e9",
        overflow: "hidden",
      }}
    >
      <div className="container">
        <div className="text-center mb-4 pt-4">
          <h1 className="display-5 fw-bold" style={{ color: "#222" }}>
            What’s Happening at Vanguard?
          </h1>
          <p className="lead text-muted">Stay in the loop with our latest campus events.</p>
        </div>

        <div className="d-flex flex-column flex-lg-row align-items-center">
          <div className="col-lg-6 mb-4 mb-lg-0 pb-3 px-4">
            <AnimatePresence mode="wait">
              <motion.img
                key={event.id}
                src={event.image}
                alt={event.title}
                className="img-fluid rounded shadow"
                style={{ width: "100%", maxHeight: "350px", objectFit: "cover" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
              />
            </AnimatePresence>
          </div>

          <div className="col-lg-6 ps-lg-5 text-center text-lg-start">
            <AnimatePresence mode="wait">
              <motion.div
                key={event.id + "-info"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
              >
                <h2 className="fw-bold mb-3" style={{ color: "#333" }}>
                  {event.title}
                </h2>
                <p className="lead text-muted mb-3">{event.shortDescription}</p>
                <p className="fw-bold text-warning">
                  <i className="bi bi-calendar-event me-2"></i>
                  {formattedDate}
                </p>
                <Link
                  to="/events"
                  className="btn btn-lg fw-bold mt-1 mb-4"
                  style={{
                    backgroundColor: "#ffc107",
                    color: "#222",
                    border: "2px solid #ffc107",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = "#ffc107";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#ffc107";
                    e.currentTarget.style.color = "#222";
                  }}
                >
                  View All Events
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
