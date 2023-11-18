import mongoose, { Schema } from "mongoose";

const transactionSchema = new Schema(
  {
    date: { type: Date, default: Date.now },
    amount: { type: Number, required: true },
    description: { type: String },
    category: { type: Schema.Types.ObjectId, ref: "Category" },
    type: { type: String, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { descriminiatorKey: "instrument" }
);

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;
