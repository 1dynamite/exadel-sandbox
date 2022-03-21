const mongoose = require("mongoose");
const expenseSchema = require("./schemas/expense");

const userExpensesSchema = new mongoose.Schema({
  userId: {
    required: true,
    type: mongoose.ObjectId,
  },
  expenses: [expenseSchema],
});

module.exports = mongoose.model("Expense", userExpensesSchema);
