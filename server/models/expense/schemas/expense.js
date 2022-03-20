const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
  {
    title: String,
    expenseDate: Date,
    categoryId: {
      type: mongoose.ObjectId,
      required: "Expense type is required",
    },
    amount: {
      type: Number,
      required: "Expense amount is required",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = expenseSchema;
