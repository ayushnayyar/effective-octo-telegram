import { accountType } from "../../common/variables.js";
import Account from "../../models/account.js";

const updateOne = async (req, res) => {
  const { name, balance, dueDate, totalDue, minimumDue } = req.body;
  const account = req.account;
  try {
    let updates = {};
    if (name) {
      updates = { ...updates, name: name };
    }
    if (balance) {
      updates = { ...updates, balance: balance };
    }
    if (account.instrument === accountType.card) {
      if (dueDate) {
        updates = { ...updates, dueDate: dueDate };
      }
      if (totalDue) {
        updates = { ...updates, totalDue: totalDue };
      }
      if (minimumDue) {
        updates = { ...updates, minimumDue: minimumDue };
      }
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
