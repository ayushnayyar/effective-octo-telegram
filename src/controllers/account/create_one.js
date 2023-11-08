import Account from "../../models/account.js";
import { accountType } from "../../common/variables.js";

const createOne = async (req, res) => {
  const { name, type, balance } = req.body;
  const user = req.user;

  try {
    let accType;
    if (type === accountType.bankAccount) {
      accType = accountType.bankAccount;
    } else {
      accType = accountType.creditCard;
    }

    const result = await Account.create({
      name: name,
      type: accType,
      balance: balance,
      owner: user._id,
    });

    return res.status(201).json({ _id: result._id });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Something went wrong, account could not be created" });
  }
};

export default createOne;
