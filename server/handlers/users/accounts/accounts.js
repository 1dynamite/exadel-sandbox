const mongoose = require("mongoose");
const Income = require("../../../models/income/income");
const Expense = require("../../../models/expense/expense");
const getErrorMessage = require("../../../helpers/getErrorMessage");

const create = async (req, res) => {
  const user = req.profile;

  const newAccount = {
    incomesId: new mongoose.Types.ObjectId(),
    expensesId: new mongoose.Types.ObjectId(),
    currency: {
      name: req.body.currencyName,
      symbol: req.body.currencySymbol,
    },
  };

  const newIncome = {
    _id: newAccount.incomesId,
    userId: user._id,
    incomes: [],
  };

  const newExpense = {
    _id: newAccount.expensesId,
    userId: user._id,
    expenses: [],
  };

  user.accounts.push(newAccount);

  const income = new Income(newIncome);
  const expense = new Expense(newExpense);

  try {
    await user.save();
    await income.save();
    await expense.save();

    return res.json({
      message: "Account successfully created!",
    });
  } catch (err) {
    const message = getErrorMessage(err);

    return res.status(400).json({ message });
  }
};

const read = (req, res) => {
  res.json(req.account);
};

const update = async (req, res) => {
  req.account.currency.name = req.body.currencyName;
  req.account.currency.symbol = req.body.currencySymbol;

  try {
    await req.profile.save();

    return res.json({
      message: "Account is successfully updated",
    });
  } catch (err) {
    const message = getErrorMessage(err);

    return res.status(400).json({ message });
  }
};

const remove = async (req, res) => {
  try {
    await Income.deleteOne({ _id: req.account.incomesId });
    await Expense.deleteOne({ _id: req.account.expensesId });

    req.profile.accounts = req.profile.accounts.filter(
      (elem) => elem._id.toString() !== req.account._id.toString()
    );
    await req.profile.save();

    res.json({ message: "Account was successfully removed" });
  } catch (err) {
    res.status(400).json({
      message: "Something went wrong",
    });
  }
};

const accountByID = (req, res, next, accountId) => {
  const user = req.profile;

  const account = user.accounts.find(
    (elem) => elem._id.toString() === accountId
  );

  req.account = account;

  next();
};

module.exports = {
  create,
  read,
  update,
  remove,
  accountByID,
};
