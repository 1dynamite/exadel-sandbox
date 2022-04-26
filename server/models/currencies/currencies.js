const mongoose = require("mongoose");

const CurrencySchema = new mongoose.Schema({
  name: {
    type: String,
    required: "Currency name is required",
  },
  symbol: {
    type: String,
    required: "Currency symbol is required",
  },
});

module.exports = mongoose.model("Currencies", CurrencySchema, "currencies");
