const express = require("express");
const bodyParser = require("body-parser");

const authRoutes = require("./routes/auth");
const activityRoutes = require("./routes/activities");
const bookingRoutes = require("./routes/bookings");

const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => {   //for testing
    return res.send("Hello");
});

app.use("/api/auth", authRoutes);
app.use("/api/activities", activityRoutes); //add some activity data into mysql using data provided in activity_data.txt
app.use("/api/bookings", bookingRoutes);


PORT = process.env.PORT || 3735

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
