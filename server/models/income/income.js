const mongoose = require("mongoose");
const incomeSchema = require("./schemas/income");

const userIncomesSchema = new mongoose.Schema({
  userId: {
    required: true,
    type: mongoose.ObjectId,
  },
  incomes: [incomeSchema],
});

module.exports = mongoose.model("Income", userIncomesSchema);
