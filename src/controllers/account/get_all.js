import User from "../../models/user.js";

const getAll = async (req, res) => {
  try {
    return res.status(200).json({ accounts: req.user.accounts });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Something went wrong, accounts could not be fetched" });
  }
};

export default getAll;
