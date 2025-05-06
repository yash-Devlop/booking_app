const express = require("express");
const pool = require("../db");
const authenticate = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", authenticate, async (req, res) => {
  const { activityId } = req.body;
  const userId = req.user.id;

  try {
    await pool.execute("INSERT INTO bookings (user_id, activity_id) VALUES (?, ?)", [userId, activityId]);
    res.json({ message: "Activity booked" });
  } catch (err) {
    res.status(500).json({ message: "Booking failed", error: err });
  }
});

router.get("/", authenticate, async (req, res) => {
  const userId = req.user.id;

  try {
    const [bookings] = await pool.execute(`
      SELECT a.id, a.title, a.description, a.location, a.date, a.time
      FROM bookings b
      JOIN activities a ON b.activity_id = a.id
      WHERE b.user_id = ?
    `, [userId]);
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch bookings", error: err });
  }
});

module.exports = router;
