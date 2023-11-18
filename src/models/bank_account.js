import { Schema } from "mongoose";

import Account from "./account.js";
import { bankAccountType } from "../common/variables.js";

const BankAccountSchema = new Schema({
  bankAccountType: {
    type: String,
    required: true,
    enum: [bankAccountType.savings, bankAccountType.current],
  },
});

const BankAccount = Account.discriminator("BankAccount", BankAccountSchema);

export default BankAccount;
