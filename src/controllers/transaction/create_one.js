import Transaction from "../../models/transaction.js";
import { transactionType } from "../../common/variables.js";

const createOne = async (req, res) => {
  const { account, description, type, category } = req.body;
  const user = req.user;

  try {
    let txnType;
    if (type === transactionType.income) {
      txnType = transactionType.income;
    } else {
      txnType = transactionType.expense;
    }

    const result = await Transaction.create({
      amount: amount,
      description: description,
      type: txnType,
      category: category,
      owner: account._id,
    });

    return res.status(201).json({ _id: result._id });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong, transaction could not be added",
    });
  }
};

export default createOne;
