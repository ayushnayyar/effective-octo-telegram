const getAll = async (req, res) => {
  const user = req.user;
  try {
    let allTransactions = [];
    user.accounts.forEach((account) => {
      allTransactions = [...allTransactions, ...account.transactions];
    });
    const sortedTransactions = allTransactions.sort(
      (transaction1, transaction2) => transaction2.date - transaction1.date
    );
    return res.status(200).json({ transactions: sortedTransactions });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong, transactions could not be fetched",
    });
  }
};

export default getAll;
