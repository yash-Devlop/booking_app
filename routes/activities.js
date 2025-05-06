const express = require("express");
const pool = require("../db");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const [activities] = await pool.execute("select * from activities;");
    res.json(activities);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch activities", error: err });
  }
});

module.exports = router;
