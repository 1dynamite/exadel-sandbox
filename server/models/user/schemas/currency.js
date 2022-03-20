const mongoose = require("mongoose");

const currencySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: "Currency name is required",
    },
    symbol: {
      type: String,
      required: "Currency symbol is required",
    },
  },
  { _id: false }
);

module.exports = currencySchema;
