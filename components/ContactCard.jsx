import { FaPhoneAlt, FaEnvelope, FaUserTie, FaUniversity, FaRegCopy } from "react-icons/fa";
import { useState } from 'react'; 

export default function ContactCard({ person, isLoaded }) {
  const isSpecial = person?.special;
  const [copied, setCopied] = useState(false);
  
  const cardStyle = {
    borderRadius: "15px",
    backgroundColor: "#fff",
    color: "#000",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    overflow: "hidden",
    minHeight: "200px", 
    position: 'relative', 
  };

  const headerStyle = {
    height: "8px",
    background: isSpecial
      ? "linear-gradient(to right, #003366, #0055a4)" 
      : "linear-gradient(to right, #ffcc00, #ff9900)", 
  };

  const nameStyle = {
    fontSize: isSpecial ? "1.6rem" : "1.5rem",
    fontWeight: "bold",
    color: "#000",
  };

  const iconColor = isSpecial ? "#0055a4" : "#6c757d";

  
  const handleCopy = () => {
    
    const contactText = `${person.name}\n${person.designation}, ${person.department}\nPhone: ${person.phone}\nEmail: ${person.email}`;
    
    
    navigator.clipboard.writeText(contactText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); 
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  };

  if (!isLoaded) {
    
    return (
      <div className="card shadow-sm h-100 border-0" style={cardStyle}>
        <div style={headerStyle}></div>
        <div className="card-body p-4">
          <div className="placeholder-glow">
            <span className="placeholder col-6 mb-3"></span>
            <span className="placeholder col-8 mb-2"></span>
            <span className="placeholder col-5 mb-2"></span>
            <span className="placeholder col-7"></span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="card shadow-sm h-100 border-0"
      style={cardStyle}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-8px) scale(1.02)";
        e.currentTarget.style.boxShadow = "0 12px 24px rgba(0,0,0,0.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0) scale(1)";
        e.currentTarget.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)";
      }}
    >
      <div style={headerStyle}></div>

      <div className="card-body p-4 position-relative"> 
        <h4 className="fw-bold mb-1" style={nameStyle}>
          {isSpecial && (
            <FaUniversity className="me-2" style={{ color: iconColor }} />
          )}
          {person.name}
        </h4>

        <p className="text-muted mb-4 d-flex align-items-center">
          <FaUserTie className="me-2" style={{ color: iconColor }} />
          <span style={{ fontSize: "0.9rem" }}>
            {person.designation} <br />
            <span className="fw-normal text-secondary">{person.department}</span>
          </span>
        </p>

        <ul className="list-unstyled">
          <li className="mb-2 d-flex align-items-center">
            <FaPhoneAlt className="me-3" style={{ color: iconColor }} />
            <a
              href={`tel:${person.phone}`}
              style={{ textDecoration: "none", color: "#333", fontWeight: "600" }}
            >
              {person.phone}
            </a>
          </li>
          <li className="d-flex align-items-center">
            <FaEnvelope className="me-3" style={{ color: iconColor }} />
            <a
              href={`mailto:${person.email}`}
              style={{ textDecoration: "none", color: "#333", fontWeight: "600" }}
            >
              {person.email}
            </a>
          </li>
        </ul>

        
        <button
          className="btn btn-sm"
          style={{
            position: 'absolute',
            bottom: '10px',
            right: '10px',
            color: '#6c757d',
            transition: 'color 0.2s ease',
          }}
          onClick={handleCopy}
          onMouseEnter={(e) => e.currentTarget.style.color = '#000'}
          onMouseLeave={(e) => e.currentTarget.style.color = '#6c757d'}
          title="Copy to clipboard"
        >
          <FaRegCopy size={20} />
          {copied && <span className="ms-2">Copied!</span>}
        </button>
      </div>
    </div>
  );
}