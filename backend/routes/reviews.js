const express = require("express");
const router = express.Router();
const { getReviews, addReview } = require("../controllers/reviewController");
const { protect } = require("../middlewares/authMiddleware");

router.get("/", getReviews);         // Public
router.post("/", protect, addReview); // Requires login

module.exports = router;
