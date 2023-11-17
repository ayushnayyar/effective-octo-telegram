import Transaction from "../models/transaction.js";

const transactionOwnerCheck = async (req, res, next) => {
  const { id } = req.params;
  try {
    const transaction = await Transaction.findOne({ _id: id });

    if (!transaction) {
      return res
        .status(401)
        .send("Invalid transaction. Transaction does not exist.");
    }
    if (String(transaction.createdBy) != String(req.user._id)) {
      return res.status(403).send("Transaction does not belong to user.");
    }

    req.transaction = transaction;

    next();
  } catch (err) {
    return res
      .status(400)
      .json({ message: "Transaction ownership verification failed" });
  }
};

export default transactionOwnerCheck;
