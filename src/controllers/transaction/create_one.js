import Transaction from "../../models/transaction.js";
import { transactionType } from "../../common/variables.js";

const createOne = async (req, res) => {
  const { account, description, type, category } = req.body;
  const user = req.user;

  try {
    if (type !== transactionType.income && type !== transactionType.expense) {
      return res.status(400).json({ message: "Wrong transaction type" });
    }

    const result = await Transaction.create({
      amount: amount,
      description: description,
      type: type,
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
