import mongoose, { Schema } from "mongoose";

const orderSchema = mongoose.Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    recipe_id: {
      type: Schema.Types.ObjectId,
      ref: "Recipe",
      required: true,
    },
    delivery_details: {
      type: Schema.Types.ObjectId,
      ref: "Delivery",
    },
    payment_status: {
      type: String,
      enum: ["pending", "paid"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
