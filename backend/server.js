const express = require("express");
const cors = require("cors");
const db = require("./db");

const authRoutes = require("./routes/auth");
const memoryRoutes = require("./routes/memory");

const app = express();
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Memory Vault API is running");
});

// TEST DB ROUTE
app.get("/test-db", (req, res) => {
  db.query("SELECT 1", (err, result) => {
    if (err) return res.status(500).send(err);
    res.send("Database connected!");
  });
});
app.use("/auth", authRoutes);
app.use("/memories", memoryRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});