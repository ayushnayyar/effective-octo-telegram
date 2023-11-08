const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  account: { type: mongoose.Schema.Types.ObjectId, ref: "Account" },
  date: Date,
  amount: Number,
  description: String,
  category: String,
  type: String, // e.g., "Expense" or "Income"
});

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
