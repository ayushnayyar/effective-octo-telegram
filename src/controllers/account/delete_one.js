import Account from "../../models/account.js";

const deleteOne = async (req, res) => {
  const account = req.account;
  try {
    const result = await Account.findOneAndDelete({ _id: account._id });
    return res.status(200).json({ account: req.account });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Something went wrong, account could not be fetched" });
  }
};

export default deleteOne;
