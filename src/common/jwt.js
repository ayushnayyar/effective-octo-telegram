import User from "../models/user";
import { jwtTokenExpiry, numberOfSessionsAllowed } from "./variables";

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
    sessions = [...sessions, { token: token }];
  }

  // Update user
  await User.findByIdAndUpdate(
    user._id,
    { sessions: sessions },
    { safe: true },
    (err, docs) => {
      if (err) {
        console.log(err);
      }
    }
  );

  return token;
};
