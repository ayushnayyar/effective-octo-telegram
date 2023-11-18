import { Schema } from "mongoose";
import Transaction from "./transaction.js";

const AccountSchema = new Schema({
  account: { type: Schema.Types.ObjectId, ref: "Account", required: true },
});

const AccountTransaction = Transaction.discriminator(
  "AccountTransaction",
  AccountSchema
);

export default AccountTransaction;
