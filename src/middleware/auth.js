import jwt from "jsonwebtoken";
import User from "../models/user";

const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).send("Authorization header not found.");
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.SECRET);
    const user = await User.findOne({ "sessions.token": token });

    // If the user is not found, the token is invalid...
    if (!user) {
      return res.status(401).send("Invalid token.");
    }

    req.user = user;

    next();
  } catch (error) {
    res.status(500).json({ message: "Auth failed" });
  }
};

export default auth;
