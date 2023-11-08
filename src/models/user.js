import mongoose, { Schema } from "mongoose";
import { jwtTokenExpiry } from "../common/variables.js";

const userSchema = Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    accounts: [{ type: Schema.Types.ObjectId, ref: "Account" }],
    phone: { type: String }, // TODO: Add required and unique params
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
