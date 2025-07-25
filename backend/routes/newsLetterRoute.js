const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const Subscriber = require("../models/Subscriber");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

router.post("/", async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ error: "Email is required" });

  try {
    const exists = await Subscriber.findOne({ email });
    if (exists) {
      return res.status(409).json({ error: "You're already subscribed!" });
    }

    const subscriber = new Subscriber({ email });
    await subscriber.save();

    // Send confirmation email
    await transporter.sendMail({
      from: `"Flight Deals" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "You're Subscribed! 🎉",
      html: `<h2>Thanks for subscribing!</h2><p>We'll keep you posted with our latest flight deals.</p>`,
    });

    res.json({ success: true, message: "Subscription successful" });
  } catch (error) {
    console.error("Newsletter Error:", error);
    res.status(500).json({ error: "Server error. Try again later." });
  }
});

module.exports = router;
