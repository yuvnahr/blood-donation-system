import express from "express";
import { pool } from "../db.js";

const router = express.Router();

// Add new donation
router.post("/donation", async (req, res) => {
  const { donorName, hospitalName, bloodGroup, quantity, expiry } = req.body;
  await pool.query("CALL AddBloodDonation(?, ?, ?, ?, ?)", [
    donorName,
    hospitalName,
    bloodGroup,
    quantity,
    expiry,
  ]);
  res.json({ message: "Donation added successfully" });
});

// Issue blood
router.post("/issue", async (req, res) => {
  const { recipientName, bloodGroup, amount } = req.body;
  try {
    await pool.query("CALL IssueBlood(?, ?, ?)", [
      recipientName,
      bloodGroup,
      amount,
    ]);
    res.json({ message: "Blood issued successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
