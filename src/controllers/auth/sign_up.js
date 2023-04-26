import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../../models/user.js";
import { createToken } from "../../common/jwt.js";

const signUp = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  try {
    User.findOne({ email: email }, (error, user) => {
      if (error) {
        console.log(error);
      }

      if (user) {
        return res.status(400).json({ message: "User already exists" });
      }
    });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });

    const token = createToken(result);

    const sendResponse = { _id: result._id };

    res.status(200).json({ sendResponse, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export default signUp;
