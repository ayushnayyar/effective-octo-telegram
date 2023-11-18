import Account from "../../models/account.js";
import User from "../../models/user.js";
import { accountType } from "../../common/variables.js";

const createOne = async (req, res) => {
  const { name, type, balance } = req.body;
  const user = req.user;

  try {
    if (type !== accountType.savings && type !== accountType.current) {
      return res.status(400).json({ message: "Wrong account type" });
    }
    // TODO: handle failure of create and update operations
    const result = await Account.create({
      name: name,
      type: type,
      balance: balance,
      owner: user._id,
    });

    const updateUser = await User.findOneAndUpdate(
      { _id: user._id },
      { $push: { accounts: result._id } }
    );

    return res.status(201).json({ _id: result._id });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Something went wrong, account could not be created" });
  }
};

export default createOne;
