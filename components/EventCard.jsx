import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function EventCard({ event }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      
      <div className="col-lg-4 col-md-6 col-sm-12 mb-4 px-4">
        <div
          className="card h-100 shadow-sm hover-card"
          style={{ borderRadius: "0px", cursor: "pointer" }}
        >
          
          <img
            src={event.image}
            alt={event.title}
            className="card-img-top"
            style={{ height: "220px", borderRadius: "0px", objectFit: "cover" }}
          />

          
          <div className="card-body d-flex flex-column">
            <h5
              className="fw-bold text-dark"
              style={{
                fontSize: "clamp(0.9rem, 1.2vw, 1.2rem)", 
              }}
            >
              {event.title}
            </h5>
            <p
              className="text-warning mb-1"
              style={{ fontSize: "clamp(0.8rem, 1vw, 1rem)" }}
            >
              📅 {new Date(event.date).toLocaleDateString()} <br />
              ⏰{" "}
              {new Date(event.date).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}{" "}
              <br />
              📍 {event.location}
            </p>
            <p
              style={{
                color: "#222",
                flex: 1,
                fontSize: "clamp(0.8rem, 1vw, 1rem)",
              }}
            >
              {event.shortDescription}
            </p>

            <div className="text-end">
              <span
                className="fw-bold"
                style={{ color: "#ffc107", cursor: "pointer" }}
                onClick={() => setIsExpanded(true)}
              >
                Learn More →
              </span>
            </div>
          </div>
        </div>
      </div>

      
      <AnimatePresence>
        {isExpanded && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1040,
              padding: "1rem", 
            }}
          >
            
            <motion.div
              className="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "black",
              }}
              onClick={() => setIsExpanded(false)}
            />

            
            <motion.div
              className="expanded-card"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.3 }}
              style={{
                background: "#fff",
                width: "90%",
                maxWidth: "700px", 
                maxHeight: "85vh",
                borderRadius: "12px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
                zIndex: 1050,
                overflow: "hidden",
                position: "relative",
                display: "flex",
                flexDirection: "column",
              }}
            >
              
              <img
                src={event.image}
                alt={event.title}
                style={{
                  width: "100%",
                  height: "250px",
                  objectFit: "cover",
                  flexShrink: 0,
                }}
              />

              
              <div
                className="p-4"
                style={{
                  overflowY: "auto", 
                  flex: 1,
                }}
              >
                <h2
                  className="fw-bold text-dark"
                  style={{ fontSize: "clamp(1.2rem, 2vw, 1.8rem)" }}
                >
                  {event.title}
                </h2>
                <p
                  className="text-warning"
                  style={{ fontSize: "clamp(0.9rem, 1vw, 1.1rem)" }}
                >
                  📅 {new Date(event.date).toLocaleDateString()} | ⏰{" "}
                  {new Date(event.date).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}{" "}
                  | 📍 {event.location}
                </p>
                <p
                  style={{
                    color: "#222",
                    fontSize: "clamp(0.9rem, 1vw, 1rem)",
                  }}
                >
                  {event.detailedDescription}
                </p>

                <div className="text-end mt-3">
                  <button
                    className="btn btn-warning fw-bold"
                    onClick={() => setIsExpanded(false)}
                  >
                    Show Less
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
