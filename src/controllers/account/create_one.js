import Account from "../../models/account.js";
import { accountType } from "../../common/variables.js";

const createOne = async (req, res) => {
  const { name, type, balance } = req.body;
  const user = req.user;

  try {
    if (type !== accountType.bankAccount && type !== accountType.creditCard) {
      return res.status(400).json({ message: "Wrong account type" });
    }

    const result = await Account.create({
      name: name,
      type: type,
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
