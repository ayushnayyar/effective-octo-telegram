import mongoose, { Schema } from "mongoose";

const cardSchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  balance: { type: Number, default: 0 },
  owner: { type: Schema.Types.ObjectId, ref: "User" },
  transactions: [{ type: Schema.Types.ObjectId, ref: "Transaction" }],
  dueDate: { type: Date },
  totalDue: { type: Number },
  minimumDue: { type: Number },
});

const Card = mongoose.model("Card", cardSchema);

export default Card;
