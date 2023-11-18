import CardAccount from "../../models/card_account.js";
import BankAccount from "../../models/bank_account.js";
import User from "../../models/user.js";
import {
  accountType,
  bankAccountType,
  cardType,
} from "../../common/variables.js";

const createOne = async (req, res) => {
  const {
    name,
    instrument,
    instrumentType,
    balance,
    dueDate,
    totalDue,
    minimumDue,
  } = req.body;
  const user = req.user;

  try {
    if (instrument !== accountType.card && instrument !== accountType.bank) {
      return res.status(400).json({ message: "Wrong instrument type" });
    }
    let result;
    if (instrument === accountType.bank) {
      if (
        instrumentType !== bankAccountType.savings &&
        instrumentType !== bankAccountType.current
      ) {
        res.status(400).json({ message: "Wrong bank account type" });
      }
      result = await BankAccount.create({
        name: name,
        instrument: instrument,
        bankAccountType: instrumentType,
        balance: balance,
        owner: user._id,
      });
    }

    if (instrument === accountType.card) {
      if (
        instrumentType !== cardType.credit &&
        instrumentType !== cardType.charge
      ) {
        res.status(400).json({ message: "Wrong card account type" });
      }
      result = await CardAccount.create({
        name: name,
        balance: balance,
        instrument: instrument,
        cardType: instrumentType,
        owner: user._id,
        dueDate: dueDate,
        totalDue: totalDue,
        minimumDue: minimumDue,
      });
    }

    // TODO: handle failure of create and update operations
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
