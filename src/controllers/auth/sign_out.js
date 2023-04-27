import { removeToken } from "../../common/jwt.js";

const signOut = async (req, res) => {
  const user = req.user;
  const token = req.token;

  try {
    if (!user) {
      return res.status(404).json({ message: "User doesn't exist" });
    }

    const status = await removeToken(user, token);

    if (!status) {
      return res.status(400).json({ message: "Log out failed" });
    }

    return res.status(200).json({ message: "Successfully logged out" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export default signOut;
