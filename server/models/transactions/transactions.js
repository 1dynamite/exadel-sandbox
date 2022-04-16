const mongoose = require("mongoose");
const transactionSchema = require("./schemas/transaction");

const transactionsByIdSchema = new mongoose.Schema({
  userId: {
    required: true,
    type: mongoose.ObjectId,
  },
  transactions: [transactionSchema],
});

module.exports = mongoose.model("Transactions", transactionsByIdSchema);
