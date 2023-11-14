import jwt from "jsonwebtoken";
import User from "../models/user.js";

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send("Authorization header not found.");
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).send("Token not provided.");
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    let user;
    if (!req.populate) {
      user = await User.findOne({ "sessions.token": token });
    } else {
      user = await User.findOne({ "sessions.token": token }).populate(
        "accounts"
      );
    }
    // If the user is not found, the token is invalid...
    if (!user) {
      return res.status(401).send("Invalid token.");
    }

    const jwtIssuedAt = new Date(decoded.iat * 1000);

    if (
      user.lastPasswordChangedDate &&
      user.lastPasswordChangedDate > jwtIssuedAt
    ) {
      return res.status(401).send("Invalid token.");
    }

    req.user = user;
    req.token = token;

    next();
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {
      return res.status(401).send("Invalid token.");
    } else if (err instanceof jwt.TokenExpiredError) {
      return res.status(401).send("Token has expired.");
    }

    return res.status(400).json({ message: "Auth failed" });
  }
};

export default auth;
