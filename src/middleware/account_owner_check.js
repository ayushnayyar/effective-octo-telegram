import Account from "../models/account.js";

const accountOwnerCheck = async (req, res, next) => {
  const { id } = req.params;
  try {
    const account = await Account.findOne({ _id: id });

    if (!account) {
      return res.status(401).send("Invalid account. Account does not exist.");
    }
    if (String(account.owner) != String(req.user._id)) {
      return res.status(403).send("Account does not belong to user.");
    }

    req.account = account;

    next();
  } catch (err) {
    return res
      .status(400)
      .json({ message: "Account ownership verification failed" });
  }
};

export default accountOwnerCheck;
