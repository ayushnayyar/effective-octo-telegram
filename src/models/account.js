import mongoose, { Schema } from "mongoose";

const accountSchema = new Schema({
  name: String,
  type: String,
  balance: Number,
  owner: { type: Schema.Types.ObjectId, ref: "User" },
  transactions: [{ type: Schema.Types.ObjectId, ref: "Transaction" }],
});

const Account = mongoose.model("Account", accountSchema);

export default Account;
