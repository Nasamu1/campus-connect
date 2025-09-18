import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About Us" },
    { path: "/events", label: "Events" },
    { path: "/gallery", label: "Gallery" },
    { path: "/feedback", label: "Feedback" },
    { path: "/contact", label: "Contact Us" },
  ];

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-transparent px-4">
      <div className="container-fluid">
        <Link
          to="/"
          className="navbar-brand fw-bold d-flex align-items-center zoom-click"
        >
          <img
            src="/assets/images/logo.png"
            alt="CampusConnect Logo"
            style={{ width: "60px", height: "60px", marginRight: "10px" }}
          />
          <span className="d-none d-sm-inline">Campus Connect</span>
        </Link>

        <button
          className="navbar-toggler zoom-click"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
          aria-controls="mainNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span
            style={{
              display: "inline-block",
              width: 26,
              height: 2,
              backgroundColor: "#ffc107",
              position: "relative",
            }}
          >
            <span
              style={{
                position: "absolute",
                top: -8,
                left: 0,
                width: 26,
                height: 2,
                backgroundColor: "#ffc107",
              }}
            />
            <span
              style={{
                position: "absolute",
                top: 8,
                left: 0,
                width: 26,
                height: 2,
                backgroundColor: "#ffc107",
              }}
            />
          </span>
        </button>

        <div className="collapse navbar-collapse justify-content-end" id="mainNavbar">
          <ul className="navbar-nav">
            {navLinks.map((link) => (
              <li className="nav-item mx-2" key={link.path}>
                <Link
                  to={link.path}
                  className={`nav-link zoom-click ${
                    location.pathname === link.path ? "active-link" : ""
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
