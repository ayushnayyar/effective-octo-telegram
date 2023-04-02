import mongoose from "mongoose";

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
    delivery_date: {
      type: Date,
      required: true,
    },
    delivery_status: {
      type: String,
      enum: ["pending", "in_progress", "delivered", "delayed"],
      default: "pending",
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
