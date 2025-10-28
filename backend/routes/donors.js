import express from "express";
import { pool } from "../db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM donors");
  res.json(rows);
});

router.post("/", async (req, res) => {
  const { name, contact, dob, blood_group } = req.body;
  await pool.query(
    "INSERT INTO donors (name, contact, dob, blood_group) VALUES (?, ?, ?, ?)",
    [name, contact, dob, blood_group]
  );
  res.json({ message: "Donor added successfully" });
});

export default router;
