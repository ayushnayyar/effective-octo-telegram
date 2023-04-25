import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../../models/user.js";

const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email: email });

    if (!existingUser) {
      return res.status(404).json({ message: "User doesn't exist" });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        email: existingUser.email,
        id: existingUser._id,
      },
      // Generate strong secret and store in env
      process.env.SECRET,
      { expiresIn: "14d" }
    );

    const sendResponse = {
      _id: existingUser._id,
    };

    res.status(200).json({ result: sendResponse, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export default signIn;
