const mongoose = require("mongoose");
const Transactions = require("../../../../models/transactions/transactions");
const getErrorMessage = require("../../../../helpers/getErrorMessage");

const create = async (req, res) => {
  try {
    const transactionsObj = await Transactions.findById(
      req.account.transactions
    );

    const newTransaction = {
      _id: new mongoose.Types.ObjectId(),
      title: req.body.title,
      receivalDate: req.body.receivalDate,
      category: req.body.category,
      amount: req.body.amount,
    };

    transactionsObj.transactions.push(newTransaction);

    req.account.balance += newTransaction.amount;

    const ctgr = req.profile.categories.find(
      (element) => element._id.toString() === newTransaction.category.categoryId
    );

    ctgr.transactions.push(newTransaction._id);

    try {
      await transactionsObj.save();
      await req.profile.save();

      return res.json({
        message: "Transaction successfully added!",
      });
    } catch (err) {
      const message = getErrorMessage(err);

      return res.status(400).json({ message });
    }
  } catch (err) {
    return res
      .status(400)
      .json({ message: "Could not find user.accounts.transactionsObj" });
  }
};

const read = (req, res) => {
  res.json(req.transaction);
};

const readAll = async (req, res) => {
  try {
    const transactionsObj = await Transactions.findById(
      req.account.transactions
    );

    res.json(transactionsObj.transactions);
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

const update = async (req, res) => {
  req.account.balance += req.body.amount - req.transaction.amount;

  req.transaction.title = req.body.title;
  req.transaction.category = req.body.category;
  req.transaction.amount = req.body.amount;

  try {
    await req.transaction.ownerDocument().save();
    await req.profile.save();

    return res.json({
      message: "Transaction successfully updated!",
    });
  } catch (err) {
    const message = getErrorMessage(err);

    return res.status(400).json({ message });
  }
};

const remove = async (req, res) => {
  try {
    const transactionsObj = await Transactions.findById(
      req.account.transactions
    );

    transactionsObj.transactions = transactionsObj.transactions.filter(
      (elem) => elem._id.toString() !== req.transaction._id.toString()
    );

    req.account.balance -= req.transaction.amount;

    await transactionsObj.save();
    await req.profile.save();

    res.json({
      message: "Transaction successfully deleted!",
    });
  } catch (err) {
    res.status(400).json({
      message: "Something went wrong",
    });
  }
};

const transactionById = async (req, res, next, transactionId) => {
  try {
    const transactionsObj = await Transactions.findById(
      req.account.transactions
    );

    const transaction = transactionsObj.transactions.find(
      (elem) => elem._id.toString() === transactionId
    );

    req.transaction = transaction;

    next();
  } catch (err) {
    res
      .status(400)
      .json({ message: "Could not find user.accounts.transactionsObj" });
  }
};

module.exports = {
  create,
  read,
  readAll,
  update,
  remove,
  transactionById,
};
