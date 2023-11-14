import User from "../../models/user.js";

const getAll = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user._id }).populate("accounts");
    // const result = await Account.findOneAndUpdate(
    //   { _id: account._id },
    //   account
    // );
    return res.status(200).json({ message: "" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Something went wrong, account could not be fetched" });
  }
};

export default getAll;
