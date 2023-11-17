import Transaction from "../../models/transaction.js";
import Account from "../../models/account.js";

import { transactionType } from "../../common/variables.js";

const createOne = async (req, res) => {
  const { amount, account, description, type, category } = req.body;

  try {
    if (type !== transactionType.credit && type !== transactionType.debit) {
      return res.status(400).json({ message: "Wrong transaction type" });
    }

    // TODO: Validate other fields

    const result = await Transaction.create({
      amount: amount,
      description: description,
      type: type,
      category: category,
      account: account,
      createdBy: req.user._id,
    });

    const addToAccount = await Account.findOneAndUpdate(
      { _id: account },
      { $push: { transactions: result._id } }
    );

    return res.status(201).json({ _id: result._id });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong, transaction could not be added",
    });
  }
};

export default createOne;
