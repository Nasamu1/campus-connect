import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../App.css";

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [filters, setFilters] = useState({
    year: "All",
    category: "All",
  });

  useEffect(() => {
    fetch("/data/gallery.json")
      .then((res) => res.json())
      .then((data) => setImages(data))
      .catch((err) => console.error("Error loading gallery data:", err));
  }, []);

  const filteredImages = images.filter((image) => {
    const matchesYear =
      filters.year === "All" || image.year === filters.year;
    const matchesCategory =
      filters.category === "All" || image.category === filters.category;
    return matchesYear && matchesCategory;
  });

  const years = [...new Set(images.map((image) => image.year))].sort();
  const categories = [...new Set(images.map((image) => image.category))].sort();

  return (
    <div className="gallery-page">
      

      <header
        className="gallery-hero d-flex flex-column "
        style={{
          backgroundImage: "url('/public/assets/images/gallery_banner.webp')", 
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "40vh",
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
        <Navbar />
        <div
          className="text-center px-4 mx-auto justify-content-center align-items-center container"
          style={{ position: "relative", zIndex: 2 }}
        >
          <motion.h1
            className="display-3 fw-bold text-warning"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1 }}
          >
            Gallery
          </motion.h1>
          <motion.p
            className="lead"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.9 }}
          >
            Explore our memories, organized by year and category.
          </motion.p>
        </div>
      </header>

      <div className="container my-5">
        <h1 className="fw-bold text-center mb-4">Event Photos</h1>

        <div className="d-flex justify-content-center gap-3 mb-4">
          <select
            className="form-select w-auto"
            value={filters.year}
            onChange={(e) => setFilters({ ...filters, year: e.target.value })}
          >
            <option value="All">All Years</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          <select
            className="form-select w-auto"
            value={filters.category}
            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          >
            <option value="All">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="gallery-grid">
          {filteredImages.length > 0 ? (
            filteredImages.map((image) => (
              <div key={image.id} className="gallery-item">
                <img src={image.imageUrl} alt={image.title} className="gallery-image" />
                <div className="image-info">
                  <span className="image-title">{image.title}</span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-muted w-100">
              No images found matching your criteria.
            </p>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}