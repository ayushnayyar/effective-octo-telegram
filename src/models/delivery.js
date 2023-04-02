import mongoose from "mongoose";

const deliverySchema = mongoose.Schema(
  {
    order_id: {
      type: Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    delivery_address: {
      type: String,
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
  },
  { timestamps: true }
);

const Delivery = mongoose.model("Delivery", deliverySchema);

export default Delivery;
