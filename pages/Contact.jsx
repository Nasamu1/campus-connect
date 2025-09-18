import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ContactCard from "/src/components/ContactCard";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function Contact() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetch("/data/contacts.json")
      .then((res) => res.json())
      .then((data) => setContacts(data))
      .catch((err) => console.error("Error loading contacts:", err));
  }, []);

  return (
    <>
      
      <div
        className="container-fluid pb-5"
        style={{ backgroundColor: "#121212" }}
      >
        <div className="container">

          <Navbar />
          <h1
            className="text-center fw-bold mb-5"
            style={{ color: "#ffc107" }}
          >
            Contact Coordinators
          </h1>

          <div className="row g-4">
            {contacts.map((person, index) => (
              <div key={index} className="col-lg-4 col-md-6 col-sm-12">
                <ContactCard person={person} isLoaded={contacts.length > 0} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
