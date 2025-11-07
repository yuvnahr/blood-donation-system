// backend/routes/donors.js
import express from "express";
import { pool } from "../db.js";

const router = express.Router();

// ✅ Eligibility constants
const RULES = {
  MIN_AGE: 18,
  MAX_AGE: 65,
  MIN_WEIGHT: 50,
  MIN_HEMOGLOBIN: 12.5,
};

// ✅ Helper: compute age from DOB if age not provided
function computeAge(dobStr) {
  if (!dobStr) return null;
  const dob = new Date(dobStr);
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  if (
    today.getMonth() < dob.getMonth() ||
    (today.getMonth() === dob.getMonth() &&
      today.getDate() < dob.getDate())
  ) {
    age--;
  }
  return age;
}

// ✅ GET all donors
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM donors ORDER BY donor_id DESC");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch donors" });
  }
});

// ✅ Register donor (with eligibility checks)
router.post("/", async (req, res) => {
  try {
    let { name, contact, dob, age, weight, hemoglobin, is_first_time, blood_group } = req.body;

    if (!age && dob) age = computeAge(dob);

    if (!name || !contact || !age || !weight || !hemoglobin || !blood_group) {
      return res.status(400).json({
        error:
          "Missing fields! Required: name, contact, age (or dob), weight, hemoglobin, blood_group"
      });
    }

    // ✅ Eligibility checks
    if (age < RULES.MIN_AGE || age > RULES.MAX_AGE)
      return res.status(400).json({ error: "Donor age must be 18-65" });

    if (weight < RULES.MIN_WEIGHT)
      return res.status(400).json({ error: "Donor must weigh at least 50kg" });

    if (hemoglobin < RULES.MIN_HEMOGLOBIN)
      return res.status(400).json({ error: "Hemoglobin must be ≥12.5 g/dL" });

    // Default first-time to YES
    if (is_first_time === undefined) is_first_time = 1;

    const sql = `
      INSERT INTO donors (name, contact, dob, age, weight, hemoglobin, is_first_time, blood_group)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    await pool.query(sql, [
      name,
      contact,
      dob,
      age,
      weight,
      hemoglobin,
      is_first_time,
      blood_group,
    ]);

    res.json({ message: "✅ Donor registered successfully!" });
  } catch (err) {
    console.error("❌ Error adding donor:", err);
    res.status(500).json({ error: "Server error while adding donor" });
  }
});

export default router;
