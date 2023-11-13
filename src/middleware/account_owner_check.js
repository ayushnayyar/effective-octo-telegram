import Account from "../models/account.js";

const accountOwnerCheck = async (req, res, next) => {
  const { id } = req.params;
  try {
    const account = await Account.findOne({ _id: id });
    console.log(account);

    if (!account) {
      return res.status(401).send("Invalid account.");
    }
    if (String(account.owner) != String(req.user._id)) {
      return res.status(403).send("Account does not belong to user.");
    }

    req.account = account;

    next();
  } catch (err) {
    return res.status(400).json({ message: "Account verification failed" });
  }
};

export default accountOwnerCheck;
