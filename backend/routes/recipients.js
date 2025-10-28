import express from "express";
import { pool } from "../db.js";

const router = express.Router();

// Get all recipients
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM recipients");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a new recipient
router.post("/", async (req, res) => {
  const { name, contact, hospitalName, blood_group } = req.body;
  try {
    const [hospital] = await pool.query("SELECT hospital_id FROM hospitals WHERE name = ?", [hospitalName]);
    if (hospital.length === 0)
      return res.status(400).json({ error: "Hospital not found" });

    const hospital_id = hospital[0].hospital_id;
    await pool.query(
      "INSERT INTO recipients (name, contact, hospital_id, blood_group) VALUES (?, ?, ?, ?)",
      [name, contact, hospital_id, blood_group]
    );

    res.json({ message: "Recipient added successfully!" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
