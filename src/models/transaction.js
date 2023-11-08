import mongoose, { Schema } from "mongoose";

const transactionSchema = new Schema({
  account: { type: Schema.Types.ObjectId, ref: "Account" },
  date: Date,
  amount: Number,
  description: String,
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  type: String,
});

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;
