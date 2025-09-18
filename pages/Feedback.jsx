import { useState } from "react";
import { Link } from "react-router-dom";
import "/src/styles/Feedback.css";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Feedback = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    userType: "",
    eventAttended: "",
    rating: "",
    comments: "",
  });

  const [hoverRating, setHoverRating] = useState(0);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleStarClick = (rating) => {
    setFormData({
      ...formData,
      rating: rating.toString(),
    });
  };

  const handleStarHover = (rating) => {
    setHoverRating(rating);
  };

  const handleStarLeave = () => {
    setHoverRating(0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      "Thank you for your feedback! (This is a UI demonstration - no data is processed or stored)"
    );
  };

  const recentEvents = [
    "Tech Symposium 2023 - November 15",
    "Cultural Festival - November 20",
    "Basketball Tournament - November 25",
    "Web Development Workshop - October 30",
    "Annual Music Night - October 25",
  ];

  return (
    <>
      <div className="body pb-4 px-4 pt-2">
        <Navbar/>
        <div className="feedback-header">
          <h1>Event Feedback</h1>
          <p>
            This is a demonstration form for UI purposes only. No data will be
            processed or stored.
          </p>
        </div>

        <form className="feedback-form" onSubmit={handleSubmit}>
          <div className="form-section">
            <h2>Personal Information</h2>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="userType">User Type *</label>
              <select
                id="userType"
                name="userType"
                value={formData.userType}
                onChange={handleChange}
                required
              >
                <option value="">Select your role</option>
                <option value="student">Student</option>
                <option value="faculty">Faculty</option>
                <option value="staff">Staff</option>
                <option value="alumni">Alumni</option>
                <option value="guest">Guest</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div className="form-section">
            <h2>Event Feedback</h2>

            <div className="form-group">
              <label htmlFor="eventAttended">
                Event Attended (Past Month Only) *
              </label>
              <select
                id="eventAttended"
                name="eventAttended"
                value={formData.eventAttended}
                onChange={handleChange}
                required
              >
                <option value="">Select an event</option>
                {recentEvents.map((event, index) => (
                  <option key={index} value={event}>
                    {event}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Rating (1-5 Scale) *</label>
              <div className="star-rating">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`star ${
                      star <= (hoverRating || formData.rating) ? "filled" : ""
                    }`}
                    onClick={() => handleStarClick(star)}
                    onMouseEnter={() => handleStarHover(star)}
                    onMouseLeave={handleStarLeave}
                  >
                    ★
                  </span>
                ))}
                <input
                  type="hidden"
                  name="rating"
                  value={formData.rating}
                  required
                />
              </div>
              <div className="rating-labels">
                <span>Poor</span>
                <span>Excellent</span>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="comments">Comments</label>
              <textarea
                id="comments"
                name="comments"
                rows="5"
                value={formData.comments}
                onChange={handleChange}
                placeholder="Share your thoughts, suggestions, or experience with the event..."
              ></textarea>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="submit-btn">
              Submit Feedback
            </button>
            <p className="demo-notice">
              This is a UI demonstration only. No data will be processed or
              stored.
            </p>
          </div>
        </form>
      </div>

      <Footer />
    </>
  );
};

export default Feedback;
