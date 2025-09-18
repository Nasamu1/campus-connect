import { useState } from "react";
import { FaSortAlphaDown, FaSortAlphaUp, FaFilter, FaTimes } from "react-icons/fa";

export default function EventFilter({ onFilter }) {
  const [filters, setFilters] = useState({
    category: "All",
    dateFilter: "All",
    search: "",
    sortOrder: "none",
    startDate: "",
    endDate: "",
  });

  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const handleChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilter(newFilters);
  };

  const toggleSort = () => {
    const newOrder =
      filters.sortOrder === "asc"
        ? "desc"
        : filters.sortOrder === "desc"
        ? "none"
        : "asc";

    handleChange("sortOrder", newOrder);
  };

  const resetFilters = () => {
    const reset = {
      category: "All",
      dateFilter: "All",
      search: "",
      sortOrder: "none",
      startDate: "",
      endDate: "",
    };
    setFilters(reset);
    onFilter(reset);
  };

  return (
    <div className="mb-4">
     
      <div className="mb-3">
        <label className="form-label fw-bold">Search by Name</label>
        <input
          type="text"
          className="form-control"
          placeholder="Search events..."
          value={filters.search}
          onChange={(e) => handleChange("search", e.target.value)}
        />
      </div>

      
      <div className="d-none d-md-block">
        <div className="card shadow-sm p-3">
          <div className="row g-3 align-items-end">
           
            <div className="col-md-3">
              <label className="form-label fw-bold">Category</label>
              <select
                className="form-select"
                value={filters.category}
                onChange={(e) => handleChange("category", e.target.value)}
              >
                <option value="All">All</option>
                <option value="Academic Events">Academic Events</option>
                <option value="Cultural Events">Cultural Events</option>
                <option value="Sports Events">Sports Events</option>
                <option value="Departmental Events">Departmental Events</option>
              </select>
            </div>

           
            <div className="col-md-3">
              <label className="form-label fw-bold">Date</label>
              <select
                className="form-select"
                value={filters.dateFilter}
                onChange={(e) => handleChange("dateFilter", e.target.value)}
              >
                <option value="All">All</option>
                <option value="Today">Today</option>
                <option value="Upcoming">Upcoming</option>
                <option value="Past">Past</option>
              </select>
            </div>

           
            <div className="col-md-3">
              <label className="form-label fw-bold">Start Date</label>
              <input
                type="date"
                className="form-control"
                value={filters.startDate}
                onChange={(e) => handleChange("startDate", e.target.value)}
              />
            </div>

            <div className="col-md-3">
              <label className="form-label fw-bold">End Date</label>
              <input
                type="date"
                className="form-control"
                value={filters.endDate}
                onChange={(e) => handleChange("endDate", e.target.value)}
              />
            </div>

           
            <div className="col-md-2 d-flex align-items-center">
              <button
                className="btn btn-warning fw-bold w-100"
                onClick={toggleSort}
              >
                {filters.sortOrder === "asc" && <FaSortAlphaDown />}
                {filters.sortOrder === "desc" && <FaSortAlphaUp />}
                {filters.sortOrder === "none" && "A-Z"}
              </button>
            </div>

            <div className="col-md-2 d-flex align-items-center">
              <button
                className="btn btn-outline-secondary w-100"
                onClick={resetFilters}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="d-md-none">
        {!showMobileFilters ? (
          <button
            className="btn btn-outline-secondary w-100 d-flex justify-content-center align-items-center gap-2"
            onClick={() => setShowMobileFilters(true)}
          >
            <FaFilter /> Filters
          </button>
        ) : (
          <div className="card shadow-sm p-3 mt-2">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h6 className="mb-0 fw-bold">Filters</h6>
              <button
                className="btn btn-sm btn-outline-dark"
                onClick={() => setShowMobileFilters(false)}
              >
                <FaTimes />
              </button>
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">Category</label>
              <select
                className="form-select"
                value={filters.category}
                onChange={(e) => handleChange("category", e.target.value)}
              >
                <option value="All">All</option>
                <option value="Academic Events">Academic Events</option>
                <option value="Cultural Events">Cultural Events</option>
                <option value="Sports Events">Sports Events</option>
                <option value="Departmental Events">Departmental Events</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">Date</label>
              <select
                className="form-select"
                value={filters.dateFilter}
                onChange={(e) => handleChange("dateFilter", e.target.value)}
              >
                <option value="All">All</option>
                <option value="Today">Today</option>
                <option value="Upcoming">Upcoming</option>
                <option value="Past">Past</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">Start Date</label>
              <input
                type="date"
                className="form-control"
                value={filters.startDate}
                onChange={(e) => handleChange("startDate", e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">End Date</label>
              <input
                type="date"
                className="form-control"
                value={filters.endDate}
                onChange={(e) => handleChange("endDate", e.target.value)}
              />
            </div>

            <div className="mb-3">
              <button className="btn btn-warning fw-bold w-100" onClick={toggleSort}>
                {filters.sortOrder === "asc" && <FaSortAlphaDown />}
                {filters.sortOrder === "desc" && <FaSortAlphaUp />}
                {filters.sortOrder === "none" && "A-Z"}
              </button>
            </div>

            <div>
              <button
                className="btn btn-outline-secondary w-100"
                onClick={resetFilters}
              >
                Reset
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
