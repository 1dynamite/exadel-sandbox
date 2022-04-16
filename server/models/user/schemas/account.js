const mongoose = require("mongoose");
const currencySchema = require("./currency");

const accountSchema = new mongoose.Schema({
  transactions: mongoose.ObjectId,

  title: {
    type: String,
    required: [true, "Account title is required"],
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
