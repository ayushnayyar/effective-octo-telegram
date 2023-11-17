import Transaction from "../../models/transaction.js";

const updateOne = async (req, res) => {
  const { amount, description, type, category } = req.body;
  const transaction = req.transaction;
  try {
    if (amount) {
      transaction.amount = amount;
    }
    if (type) {
      transaction.type = type;
    }
    if (description) {
      transaction.description = description;
    }
    if (category) {
      transaction.category = category;
    }
    // TODO: handle failure of update operation
    const result = await Transaction.findOneAndUpdate(
      { _id: transaction._id },
      transaction
    );
    return res.status(200).json({ message: "Transaction updated" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong, transaction could not be updated",
    });
  }
};

export default updateOne;
