const mysql = require('mysql2/promise');
require('dotenv').config()

const pass = process.env.DB_PASS

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: pass,
  database: 'activities_booking_app',
});

module.exports = pool;
