const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
  name: String,
  type: String,
  balance: Number,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  transactions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Transaction" }],
});

const Account = mongoose.model("Account", accountSchema);

module.exports = Account;
