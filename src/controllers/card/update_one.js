import Account from "../../models/account.js";

const updateOne = async (req, res) => {
  const { name, type, balance } = req.body;
  const account = req.account;
  try {
    let updates = {};
    if (name) {
      updates = { ...updates, name: name };
    }
    if (type) {
      updates = { ...updates, type: type };
    }
    if (balance) {
      updates = { ...updates, balance: balance };
    }
    // TODO: handle failure of update operation
    const result = await Account.findOneAndUpdate(
      { _id: account._id },
      updates
    );
    return res.status(200).json({ message: "Account updated" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Something went wrong, account could not be updated" });
  }
};

export default updateOne;
