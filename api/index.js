// server.js
const express = require("express");
const connectDB = require("./config/db");
require("dotenv").config();
const cors = require("cors");
const manageRewardsRoute = require("./routes/manageRewards");

const app = express();

// connect database
connectDB();

app.use(express.json({ extended: false }));
app.use(cors());

app.get("/", (req, res) => res.send("Server up and running"));

// routes
app.use("/management/rewards", manageRewardsRoute);

// setting up port
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
