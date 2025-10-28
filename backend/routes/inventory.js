import express from "express";
import { pool } from "../db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM blood_inventory");
  res.json(rows);
});

router.get("/available/:group", async (req, res) => {
  const { group } = req.params;
  const [[{ available }]] = await pool.query(
    "SELECT GetAvailableUnits(?) AS available",
    [group]
  );
  res.json({ blood_group: group, available_units: available });
});

export default router;
