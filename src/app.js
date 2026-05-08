const express = require("express");
const cors = require("cors");

// const authRoutes = require("./routes/authRoutes");
// const storyRoutes = require("./routes/storyRoutes");
// const scrapeRoutes = require("./routes/scrapeRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// app.use("/api/auth", authRoutes);
// app.use("/api/stories", storyRoutes);
// app.use("/api", scrapeRoutes);

module.exports = app;