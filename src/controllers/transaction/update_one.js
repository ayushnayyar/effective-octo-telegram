import Transaction from "../../models/transaction.js";

const updateOne = async (req, res) => {
  const { amount, description, category } = req.body;
  let transaction = req.transaction;
  try {
    let updates = {};
    if (amount) {
      updates = { ...updates, amount: amount };
    }
    if (description) {
      updates = { ...updates, description: description };
    }
    if (category) {
      updates = { ...updates, category: category };
    }

    // TODO: handle failure of update operation
    const result = await Transaction.findOneAndUpdate(
      { _id: transaction._id },
      updates,
      { upsert: true }
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
