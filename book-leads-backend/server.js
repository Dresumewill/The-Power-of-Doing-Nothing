require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect(err => {
  if (err) {
    console.error("MySQL connection failed:", err);
    return;
  }
  console.log("Connected to MySQL ✅");
});

app.post("/leads", (req, res) => {
    console.log("REQ BODY =>", req.body);
  
    const { full_name, email, primary_goal, source } = req.body;

    if (!full_name || !email || !primary_goal) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const sql = `
    INSERT INTO leads (name, email, goal, source)
    VALUES (?, ?, ?, ?)
  `;

  db.execute(
    sql,
    [full_name, email, primary_goal, source || "Landing Page"],
    (err) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          return res.status(409).json({ message: "Email already exists" });
        }
        return res.status(500).json({ message: "Database error" });
      }

      res.status(201).json({ message: "Lead saved successfully" });
    }
  );
});

if (process.env.NODE_ENV !== "test") {
  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
}

module.exports = app;
