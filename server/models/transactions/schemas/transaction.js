const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    title: String,
    type: {
      type: String,
      required: [true, "Transaction type is required"],
    },
    receivalDate: Date,
    categories: [
      {
        type: mongoose.ObjectId,
        required: [true, "At least one cateegory is required"],
      },
    ],

    amount: {
      type: Number,
      required: [true, "Transaction amount is required"],
    },
    payee: String,
    description: String,
  },
  {
    timestamps: true,
  }
);

module.exports = transactionSchema;
