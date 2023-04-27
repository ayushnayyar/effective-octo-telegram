import User from "../models/user.js";
import jwt from "jsonwebtoken";
import { jwtTokenExpiry, numberOfSessionsAllowed } from "./variables.js";

export const createToken = async (user) => {
  // create jwt
  const token = jwt.sign(
    {
      email: user.email,
      id: user._id,
    },
    process.env.SECRET, // TODO: Same secret as sign in (change later)
    { expiresIn: jwtTokenExpiry }
  );

  const numberOfActiveSessions = user.sessions.length;
  let sessions = user.sessions;

  if (numberOfActiveSessions >= numberOfSessionsAllowed) {
    sessions.shift();
  }

  sessions = [...sessions, { token: token }];

  // Update user
  await User.findByIdAndUpdate(
    user._id,
    { sessions: sessions },
    { safe: true }
  );

  return token;
};
