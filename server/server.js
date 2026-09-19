const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const todoRoutes = require("./routes/todoRoutes");
const authRoutes = require("./routes/authRoutes");
const app = express();

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);
app.get("/", (req, res) => {
  res.send("SERVER WORKS");
});
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");

    app.listen(process.env.PORT,"0.0.0.0", () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("MongoDB connection failed:", error.message);
  });