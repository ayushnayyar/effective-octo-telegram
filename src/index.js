import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
// import authRoutes from "./routes/auth.js";
// import itemRoutes from "./routes/item.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// app.use("/auth", authRoutes);
// app.use("/item", itemRoutes);

const port = process.env.PORT || 8000;

// Connect to DB
mongoose.connect(process.env.DB_CONNECTION_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
