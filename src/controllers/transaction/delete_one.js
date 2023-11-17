import Transaction from "../../models/transaction.js";
import Account from "../../models/account.js";

const deleteOne = async (req, res) => {
  const transaction = req.transaction;
  try {
    // TODO: handle failure of delete and update operations
    const result = await Transaction.findOneAndDelete({ _id: transaction._id });
    const updateAccount = await Account.findOneAndUpdate(
      { _id: req.user._id },
      { $pull: { transactions: transaction._id } }
    );
    return res.status(200).json({ message: "Transaction deleted" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({
        message: "Something went wrong, transaction could not be deleted",
      });
  }
};

export default deleteOne;
