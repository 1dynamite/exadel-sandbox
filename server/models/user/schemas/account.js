const mongoose = require("mongoose");
const currencySchema = require("./currency");

const accountSchema = new mongoose.Schema({
  transactions: mongoose.ObjectId,

  title: {
    type: String,
    required: [true, "Account title is required"],
    maxlength: [128, "Title cannot be longer than 128 characaters"],
    match: [
      /^(((\w|\d|\.|\s|,)*)(\w|\d|\s)$)$/,
      "Title should not contain symbols and trailing dots",
    ],
  },

  currency: {
    type: currencySchema,
    required: [true, "Currency is required"],
  },

  balance: {
    type: Number,
    required: [true, "Balance is required"],
    default: 0,
  },

  description: String,
});

module.exports = accountSchema;
