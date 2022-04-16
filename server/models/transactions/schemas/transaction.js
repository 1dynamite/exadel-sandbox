const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    title: String,
    receivalDate: Date,
    category: {
      categoryId: {
        type: mongoose.ObjectId,
        required: [true, "Transaction category is required"],
      },
      title: {
        type: String,
        required: [true, "Category title is required"],
      },
      type: {
        type: String,
        required: [true, "Category type is required"],
        enum: ["expense", "income"],
      },
    },
    amount: {
      type: Number,
      required: [true, "Transaction amount is required"],
    },
    description: String,
  },
  {
    timestamps: true,
  }
);

module.exports = transactionSchema;
