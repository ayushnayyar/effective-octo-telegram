import Transaction from "../../models/transaction.js";
import Account from "../../models/account.js";
import mongoose from "mongoose";

import { accountType, transactionType } from "../../common/variables.js";

const createOne = async (req, res) => {
  const { amount, account, description, type, category } = req.body;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    if (type !== transactionType.credit && type !== transactionType.debit) {
      return res.status(400).json({ message: "Wrong transaction type." });
    }

    const newTransaction = new Transaction({
      amount: amount,
      description: description,
      type: type,
      category: category,
      account: account,
      createdBy: req.user._id,
    });

    // TODO: Validate other fields
    const accountObject = await Account.findOne({ _id: account }).session(
      session
    );
    let accountBalance = accountObject.balance;

    if (type === transactionType.credit) {
      accountObject.balance = accountBalance + amount;
    }

    if (type === transactionType.debit) {
      if (accountBalance < amount) {
        if (accountObject.type === accountType.bankAccount) {
          return res.status(400).json({
            message: "Not enough balance to perform this transaction.",
          });
        }
      }
      accountObject.balance = accountBalance - amount;
    }

    await newTransaction.save({ session: session });

    await accountObject.save({ session: session });

    await session.commitTransaction();
    session.endSession();

    return res.status(201).json({ _id: newTransaction._id });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    return res.status(500).json({
      message: "Something went wrong, transaction could not be added.",
    });
  }
};

export default createOne;
