import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";

const ReviewsSection = () => {
  const { user } = useContext(UserContext);
  const [reviews, setReviews] = useState([]);
  const [text, setText] = useState("");
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get("/api/reviews");
        setReviews(res.data);
      } catch (err) {
        console.error("Failed to fetch reviews:", err);
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
      // Reload reviews
      const res = await axios.get("/api/reviews");
      setReviews(res.data);
    } catch (err) {
      console.error("Error submitting review:", err);
    }
  };

  return (
    <div className="reviews-section container my-5">
      <h3 className="mb-4">What Our Users Say</h3>

      {loading ? (
        <p>Loading reviews...</p>
      ) : reviews.length > 0 ? (
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
            ></textarea>
          </div>
          <div className="mb-2">
            <label>Rating:</label>
            <select
              className="form-select"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
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
