import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { pool } from "./db.js";
import donorsRouter from "./routes/donors.js";
import recipientsRouter from "./routes/recipients.js";
import inventoryRouter from "./routes/inventory.js";
import analyticsRouter from "./routes/analytics.js";
import proceduresRouter from "./routes/procedures.js";

dotenv.config();
const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

// Routes
app.use("/api/donors", donorsRouter);
app.use("/api/recipients", recipientsRouter);
app.use("/api/inventory", inventoryRouter);
app.use("/api/analytics", analyticsRouter);
app.use("/api/procedures", proceduresRouter);

// Basic route
app.get("/", (req, res) => {
  res.json({ message: "Blood Donation API is running ✅" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
