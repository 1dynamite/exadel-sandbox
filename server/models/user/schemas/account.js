const mongoose = require("mongoose");
const currencySchema = require("./currency");

const accountSchema = new mongoose.Schema({
  incomesId: mongoose.ObjectId,
  expensesId: mongoose.ObjectId,

  currency: {
    type: currencySchema,
    required: "Currency is required",
  },
});

const getTotalIncome = function () {
  const reducer = (prev, current) => prev + current.amount;

  const total = this.incomes.reduce(reducer, 0);

  return total;
};

const getTotalExpense = function () {
  const reducer = (prev, current) => prev + current.amount;

  const total = this.expenses.reduce(reducer, 0);

  return total;
};

const getTotalExpenseByCategory = function (val) {
  const reducer = (prev, current) => {
    if (current.categoryId === val) return prev + current.amount;

    return prev;
  };

  const total = this.expenses.reduce(reducer, 0);

  return total;
};

const getTotalIncomeByCategory = function (val) {
  const reducer = (prev, current) => {
    if (current.categoryId === val) return prev + current.amount;

    return prev;
  };

  const total = this.incomes.reduce(reducer, 0);

  return total;
};

accountSchema.virtual("totalIncome").get(getTotalIncome);

accountSchema.virtual("totalExpense").get(getTotalExpense);

accountSchema.virtual("totalExpenseByCategory").get(getTotalExpenseByCategory);

accountSchema.virtual("totalIncomeByCategory").get(getTotalIncomeByCategory);

module.exports = accountSchema;
