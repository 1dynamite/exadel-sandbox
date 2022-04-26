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
      type: req.body.type,
      receivalDate: req.body.receivalDate,
      categories: req.body.categories,
      amount: req.body.amount,
      payee: req.body.payee,
      description: req.body.description,
    };

    transactionsObj.transactions.push(newTransaction);

    req.account.balance += newTransaction.amount;

    newTransaction.categories.forEach((element) => {
      const ctgr = req.profile.categories.find(
        (profileCategories) => profileCategories._id.toString() === element
      );

      ctgr.transactions.push(newTransaction._id);
    });

    try {
      await transactionsObj.save();
      await req.profile.save();

      return res.json({
        message: "Transaction successfully added!",
        body: newTransaction,
        accountBalance: req.account.balance,
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

const sortTransactions = (arr, ftr) => {
  return arr.sort(function (a, b) {
    return  b[ftr] - a[ftr];
  });
};

const readAll = async (req, res) => {
  try {
    const transactionsObj = await Transactions.findById(
      req.account.transactions
    );

    const ftr = req.query.sortOrder ? req.query.sortOrder : "receivalDate";

    if (req.query.transactionType === undefined)
      return res.json(sortTransactions(transactionsObj.transactions, ftr));

    const filteredMany = transactionsObj.transactions.filter(
      (element) => element.type === req.query.transactionType
    );

    res.json(sortTransactions(filteredMany, ftr));
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

const update = async (req, res) => {
  req.body.categories.forEach((element) => {
    const ctgr = req.transaction.categories.find(
      (oldCategory) => oldCategory.toString() === element
    );

    if (ctgr === undefined) {
      const profCtgr = req.profile.categories.find(
        (profileCategories) => profileCategories._id.toString() === element
      );

      profCtgr.transactions.push(req.transaction._id);
    }
  });

  req.transaction.categories.forEach((element) => {
    const ctgr = req.body.categories.find(
      (newCategory) => newCategory === element.toString()
    );

    if (ctgr === undefined) {
      const profCtgr = req.profile.categories.find(
        (profileCategories) =>
          profileCategories._id.toString() === element.toString()
      );

      const index = profCtgr.transactions.findIndex(
        (it) => it._id.toString() === req.transaction._id.toString()
      );

      profCtgr.transactions.splice(index, 1);
    }
  });

  if (req.body.amount)
    req.account.balance += req.body.amount - req.transaction.amount;

  if (req.body.title) req.transaction.title = req.body.title;
  if (req.body.type) req.transaction.type = req.body.type;
  if (req.body.amount) req.transaction.amount = req.body.amount;
  if (req.body.receivalDate)
    req.transaction.receivalDate = req.body.receivalDate;
  if (req.body.payee) req.transaction.payee = req.body.payee;
  if (req.body.description) req.transaction.description = req.body.description;
  if (req.body.categories) req.transaction.categories = req.body.categories;

  try {
    await req.transaction.ownerDocument().save();
    await req.profile.save();

    return res.json({
      message: "Transaction successfully updated!",
      body: req.transaction,
      accountBalance: req.account.balance,
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

    req.transaction.categories.forEach((element) => {
      const profCtgr = req.profile.categories.find(
        (profileCategories) =>
          profileCategories._id.toString() === element.toString()
      );

      const index = profCtgr.transactions.findIndex(
        (it) => it._id.toString() === req.transaction._id.toString()
      );

      profCtgr.transactions.splice(index, 1);
    });

    transactionsObj.transactions = transactionsObj.transactions.filter(
      (elem) => elem._id.toString() !== req.transaction._id.toString()
    );

    req.account.balance -= req.transaction.amount;

    await transactionsObj.save();
    await req.profile.save();

    res.json({
      message: "Transaction successfully deleted!",
      body: req.transaction,
      accountBalance: req.account.balance,
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
    res.status(400).json({
      message: "Could not find user.accounts.transactionsObj, (by Id)",
    });
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
