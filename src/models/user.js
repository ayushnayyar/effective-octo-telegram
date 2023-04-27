import mongoose, { Schema } from "mongoose";
import { jwtTokenExpiry } from "../common/variables.js";

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String }, // TODO: Add required and unique params
    savedRecipes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Recipe",
      },
    ],
    subscription: {
      start: Date,
      end: Date,
      duration: Number,
      plan: {
        type: String,
        enum: ["none", "basic", "premium"],
        default: "none",
      },
    },
    sessions: [
      {
        token: { type: String, required: true },
        createdAt: {
          type: Date,
          required: true,
          default: Date.now,
          expires: jwtTokenExpiry,
        },
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
