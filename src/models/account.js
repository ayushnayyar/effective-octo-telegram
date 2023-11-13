import mongoose, { Schema } from "mongoose";

const accountSchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  balance: { type: Number, default: 0 },
  ownerAccount: { type: Schema.Types.ObjectId, ref: "User" },
  transactions: [{ type: Schema.Types.ObjectId, ref: "Transaction" }],
});

const Account = mongoose.model("Account", accountSchema);

export default Account;
