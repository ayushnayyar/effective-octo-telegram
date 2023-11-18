import { Schema } from "mongoose";
import Transaction from "./transaction.js";

const CardSchema = new Schema({
  card: { type: Schema.Types.ObjectId, ref: "Card", required: true },
  dueDate: { type: Date },
  totalDue: { type: Number },
  minimumDue: { type: Number },
});

const CardTransaction = Transaction.discriminator(
  "CardTransaction",
  CardSchema
);

export default CardTransaction;
