const getAll = async (req, res) => {
  const { account } = req.body;

  try {
    if (type !== transactionType.income && type !== transactionType.expense) {
      return res.status(400).json({ message: "Wrong transaction type" });
    }

    const result = await Transaction.create({
      amount: amount,
      description: description,
      type: type,
      category: category,
      account: account,
      createdBy: req.user._id,
    });

    return res.status(201).json({ _id: result._id });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong, transaction could not be added",
    });
  }
};

export default getAll;
