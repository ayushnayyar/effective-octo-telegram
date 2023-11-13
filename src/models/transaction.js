import mongoose, { Schema } from "mongoose";

const transactionSchema = new Schema({
  account: { type: Schema.Types.ObjectId, ref: "Account" },
  date: { type: Date, default: Date.now },
  amount: { type: Number, required: true },
  description: { String },
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  type: { type: String, required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: "User" },
});

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;
