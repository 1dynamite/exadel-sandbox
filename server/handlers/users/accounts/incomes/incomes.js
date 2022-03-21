const mongoose = require("mongoose");
const Income = require("../../../../models/income/income");
const getErrorMessage = require("../../../../helpers/getErrorMessage");

const create = async (req, res) => {
  try {
    const incomesObj = await Income.findById(req.account.incomesId);

    const newIncome = {
      title: req.body.title,
      receivalDate: req.body.receivalDate,
      categoryId: new mongoose.Types.ObjectId(req.body.categoryId),
      amount: req.body.amount,
    };

    incomesObj.incomes.push(newIncome);

    try {
      await incomesObj.save();

      return res.json({
        message: "Income successfully added!",
      });
    } catch (err) {
      const message = getErrorMessage(err);

      return res.status(400).json({ message });
    }
  } catch (err) {
    return res
      .status(400)
      .json({ message: "Could not find user.accounts.incomesObj" });
  }
};

const read = (req, res) => {
  res.json(req.income);
};

const update = async (req, res) => {
  req.income.title = req.body.title;
  req.income.categoryId = req.body.categoryId;
  req.income.amount = req.body.amount;

  try {
    await req.income.ownerDocument().save();

    return res.json({
      message: "Income was successfully updated!",
    });
  } catch (err) {
    const message = getErrorMessage(err);

    return res.status(400).json({ message });
  }
};

const remove = async (req, res) => {
  try {
    const incomesObj = await Income.findById(req.account.incomesId);

    incomesObj.incomes = incomesObj.incomes.filter(
      (elem) => elem._id.toString() !== req.income._id.toString()
    );

    await incomesObj.save();

    res.json({
      message: "Income successfully deleted!",
    });
  } catch (err) {
    res.status(400).json({
      message: "Something went wrong",
    });
  }
};

const incomeById = async (req, res, next, incomeId) => {
  try {
    const incomesObj = await Income.findById(req.account.incomesId);

    const income = incomesObj.incomes.find(
      (elem) => elem._id.toString() === incomeId
    );

    req.income = income;

    next();
  } catch (err) {
    res
      .status(400)
      .json({ message: "Could not find user.accounts.incomesObj" });
  }
};

module.exports = {
  create,
  read,
  update,
  remove,
  incomeById,
};
