import mongoose, { Schema } from "mongoose";

import { accountType, transactionType } from "../common/variables.js";

const transactionSchema = new Schema({
  account: { type: Schema.Types.ObjectId, ref: "Account", required: true },
  date: { type: Date, default: Date.now },
  amount: { type: Number, required: true },
  description: { type: String },
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  type: {
    type: String,
    required: true,
    enum: [transactionType.credit, transactionType.debit],
  },
  createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;
