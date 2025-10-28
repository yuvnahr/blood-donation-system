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
// Issue blood (fixed version)
router.post("/issue", async (req, res) => {
  const { recipientName, bloodGroup, amount } = req.body;

  try {
    // Step 1: Look up the recipient_id from their name
    const [recipientRows] = await pool.query(
      "SELECT recipient_id FROM recipients WHERE name = ?",
      [recipientName]
    );

    if (recipientRows.length === 0) {
      return res.status(404).json({ error: "Recipient not found" });
    }

    const recipientId = recipientRows[0].recipient_id;

    // Step 2: Call the stored procedure with recipient_id
    await pool.query("CALL IssueBlood(?, ?, ?)", [
      recipientId,
      bloodGroup,
      amount,
    ]);

    res.json({ message: "✅ Blood issued successfully!" });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});


export default router;
