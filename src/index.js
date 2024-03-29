import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { rateLimit } from "express-rate-limit";
import "dotenv/config";

import authRoutes from "./routes/auth.js";
import transactionRoutes from "./routes/transaction.js";
import accountRoutes from "./routes/account.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Define a rate limiting middleware function
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // Limit each IP to 100 requests per windowMs
});

// Apply the rate limiting middleware function to a route
app.use("/", limiter);

app.use("/auth", authRoutes);
app.use("/transaction", transactionRoutes);
app.use("/account", accountRoutes);

const port = process.env.PORT || 8000;

// Connect to DB
mongoose.connect(process.env.DB_CONNECTION_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
