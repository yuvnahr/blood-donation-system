import express from "express";
import { pool } from "../db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM recipients");
  res.json(rows);
});

router.post("/", async (req, res) => {
  const { name, contact, hospitalName, blood_group } = req.body;
  await pool.query("CALL RegisterRecipient(?, ?, ?, ?)", [
    name,
    contact,
    hospitalName,
    blood_group,
  ]);
  res.json({ message: "Recipient registered successfully" });
});

export default router;
