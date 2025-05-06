const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const pool = require("../db")
const router = express.Router()

require('dotenv').config()


const SECRET = process.env.JWT_SECRET

router.post("/register", async (req, res) => {
  const { name, email, phone, password } = req.body
  const hashedPassword = await bcrypt.hash(password, 10)
  try {
    await pool.execute(
      "INSERT INTO users (name, email, phone, password) VALUES (?, ?, ?, ?)",
      [name, email, phone, hashedPassword]
    )
    res.status(201).json({ message: "User registered" })
  } catch (err) {
    res.status(500).json({ message: "User registration failed", error: err })
  }
})

router.post("/login", async (req, res) => {
  const { email, password } = req.body
  const [rows] = await pool.execute("SELECT * FROM users WHERE email = ?", [email])
  const user = rows[0]

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid credentials" })
  }

  const token = jwt.sign({ id: user.id, email: user.email }, SECRET, { expiresIn: "1h" })
  res.json({ token })
})

module.exports = router
