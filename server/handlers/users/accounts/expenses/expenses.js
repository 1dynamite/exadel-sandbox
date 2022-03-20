const mongoose = require("mongoose");
const Expense = require("../../../../models/expense/expense");
const getErrorMessage = require("../../../../helpers/getErrorMessage");

const create = async (req, res) => {
  try {
    const expensesObj = await Expense.findById(req.account.expensesId);

    const newExpense = {
      title: req.body.title,
      receivalDate: req.body.receivalDate,
      categoryId: new mongoose.Types.ObjectId(req.body.categoryId),
      amount: req.body.amount,
    };

    expensesObj.expenses.push(newExpense);

    try {
      await expensesObj.save();

      return res.json({
        message: "Expense successfully added!",
      });
    } catch (err) {
      const message = getErrorMessage(err);

      return res.status(400).json({ message });
    }
  } catch (err) {
    return res
      .status(400)
      .json({ message: "Could not find user.accounts.expensesObj" });
  }
};

const read = (req, res) => {
  res.json(req.expense);
};

const update = async (req, res) => {
  req.expense.title = req.body.title;
  req.expense.categoryId = req.body.categoryId;
  req.expense.amount = req.body.amount;

  try {
    await req.expense.ownerDocument().save();

    return res.json({
      message: "Expense was successfully updated!",
    });
  } catch (err) {
    const message = getErrorMessage(err);

    return res.status(400).json({ message });
  }
};

const remove = async (req, res) => {
  try {
    const expensesObg = await Expense.findById(req.account.expensesId);

    expensesObg.expenses = expensesObg.expenses.filter(
      (elem) => elem._id.toString() !== req.expense._id.toString()
    );

    await expensesObg.save();

    res.json({
      message: "Expense successfully deleted!",
    });
  } catch (err) {
    res.status(400).json({
      message: "Something went wrong",
    });
  }
};

const expenseById = async (req, res, next, expenseId) => {
  try {
    const expensesObj = await Expense.findById(req.account.expensesId);

    const expense = expensesObj.expenses.find(
      (elem) => elem._id.toString() === expenseId
    );

    req.expense = expense;
  } catch (err) {
    res
      .status(400)
      .json({ message: "Could not find user.accounts.expensesObj" });
  }

  next();
};

module.exports = {
  create,
  read,
  update,
  remove,
  expenseById,
};
