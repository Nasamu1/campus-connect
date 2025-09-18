import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-dark text-light pt-5 pb-3 px-3">
      <div className="container">
        <div className="row">
          <div className="col-6 col-sm-6 col-lg-3 mb-4">
            <h5 className="fw-bold text-warning">About Vanguard</h5>
            <p className="small">
              Vanguard University is committed to excellence, innovation, and
              fostering a vibrant campus community where students thrive.
            </p>
          </div>

          <div className="col-6 col-sm-6 col-lg-3 mb-4">
            <h5 className="fw-bold text-warning">Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <Link
                  to="/about"
                  className="footer-link text-decoration-none"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/events"
                  className="footer-link text-decoration-none"
                >
                  Events
                </Link>
              </li>
              <li>
                <Link
                  to="/gallery"
                  className="footer-link text-decoration-none"
                >
                  Gallery
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="footer-link text-decoration-none"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-6 col-sm-6 col-lg-3 mb-4">
            <h5 className="fw-bold text-warning">Contact Us</h5>
            <p className="small mb-1">
              <i className="bi bi-geo-alt-fill me-2"></i> Vanguard University,
              Main Campus
            </p>
            <p className="small mb-1">
              <i className="bi bi-telephone-fill me-2"></i> +234 800 123 4567
            </p>
            <p className="small mb-0">
              <i className="bi bi-envelope-fill me-2"></i> info@vanguard.edu
            </p>
          </div>

          <div className="col-6 col-sm-6 col-lg-3 mb-4">
            <h5 className="fw-bold text-warning">Follow Us</h5>
            <div>
              <a href="#" className="footer-link fs-5 me-3">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="#" className="footer-link fs-5 me-3">
                <i className="bi bi-twitter"></i>
              </a>
              <a href="#" className="footer-link fs-5 me-3">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="#" className="footer-link fs-5">
                <i className="bi bi-linkedin"></i>
              </a>
            </div>
          </div>
        </div>

        <div className="text-center mt-4 pt-3 border-top border-secondary">
          <p className="mb-0 small">
            © {new Date().getFullYear()} Vanguard University. All rights reserved.
          </p>
        </div>
      </div>

      <style>{`
        .footer-link {
          color: #fff;
          transition: color 0.3s ease;
        }
        .footer-link:hover {
          color: #ffc107 !important;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
