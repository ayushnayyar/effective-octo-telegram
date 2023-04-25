import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../../models/user.js";

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

    const token = jwt.sign(
      {
        email: result.email,
        id: result._id,
      },

      // TODO: Same secret as sign in (change later)
      process.env.SECRET,
      { expiresIn: "14d" }
    );

    const sendResponse = { _id: result._id };

    res.status(200).json({ sendResponse, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export default signUp;
