import Account from "../../models/account.js";
import User from "../../models/user.js";

const deleteOne = async (req, res) => {
  const account = req.account;
  try {
    // TODO: handle failure of delete and update operations
    const result = await Account.findOneAndDelete({ _id: account._id });
    const updateUser = await User.findOneAndUpdate(
      { _id: req.user._id },
      { $pull: { accounts: account._id } }
    );
    return res.status(200).json({ message: "Account deleted" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Something went wrong, account could not be deleted" });
  }
};

export default deleteOne;
