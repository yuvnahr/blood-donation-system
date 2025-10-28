import express from "express";
import { pool } from "../db.js";

const router = express.Router();

router.get("/summary", async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM v_hospital_summary");
  res.json(rows);
});

router.get("/donor-ages", async (req, res) => {
  const [rows] = await pool.query(
    "SELECT name, GetDonorAge(donor_id) AS age FROM donors"
  );
  res.json(rows);
});

export default router;
