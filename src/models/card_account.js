import { Schema } from "mongoose";

import Account from "./account.js";
import { cardType } from "../common/variables.js";

const CardAccountSchema = new Schema({
  cardType: {
    type: String,
    required: true,
    enum: [cardType.credit, cardType.charge],
  },
  dueDate: { type: Date },
  totalDue: { type: Number },
  minimumDue: { type: Number },
});

const CardAccount = Account.discriminator("Card", CardAccountSchema);

export default CardAccount;
