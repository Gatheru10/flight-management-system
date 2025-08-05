import React, { useEffect, useState, useContext } from "react";
import axios from "../axiosConfig"; // Updated to use your axiosConfig
import { UserContext } from "../context/UserContext";

const ReviewsSection = () => {
  const { user } = useContext(UserContext);
  const [reviews, setReviews] = useState([]);
  const [text, setText] = useState("");
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Utility to extract reviews array safely
  const extractReviews = (data) => {
    if (Array.isArray(data)) return data;
    if (data && Array.isArray(data.reviews)) return data.reviews;
    return [];
  };

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get("/api/reviews");
        console.log("Fetched reviews:", res.data);
        const safeReviews = extractReviews(res.data);
        setReviews(safeReviews);
      } catch (err) {
        console.error("Failed to fetch reviews:", err);
        setError("Unable to load reviews at the moment.");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim() || !rating) return;

    try {
      await axios.post(
        "/api/reviews",
        { text: text.trim(), rating: Number(rating) },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setText("");
      setRating(5);

      // Reload reviews after submission
      const res = await axios.get("/api/reviews");
      const safeReviews = extractReviews(res.data);
      setReviews(safeReviews);
    } catch (err) {
      console.error("Error submitting review:", err);
      setError("Could not submit review. Try again.");
    }
  };

  return (
    <div className="reviews-section container my-5">
      <h3 className="mb-4">What Our Users Say</h3>

      {loading ? (
        <p>Loading reviews...</p>
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : Array.isArray(reviews) && reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review._id} className="mb-3 p-3 border rounded shadow-sm">
            <strong>{review.name || "Anonymous"}</strong>
            <p className="mb-1">{review.text}</p>
            <small className="text-muted">Rating: {review.rating}/5</small>
          </div>
        ))
      ) : (
        <p>No reviews yet. Be the first to leave one!</p>
      )}

      {user ? (
        <form onSubmit={handleSubmit} className="mt-4">
          <h5>Leave a Review</h5>
          <div className="mb-2">
            <textarea
              className="form-control"
              rows="3"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Share your experience..."
              required
            ></textarea>
          </div>
          <div className="mb-2">
            <label htmlFor="rating">Rating:</label>
            <select
              id="rating"
              className="form-select"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              required
            >
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>
          <button className="btn btn-primary" type="submit">
            Submit Review
          </button>
        </form>
      ) : (
        <p className="mt-4 text-muted">Log in to leave a review.</p>
      )}
    </div>
  );
};

export default ReviewsSection;
