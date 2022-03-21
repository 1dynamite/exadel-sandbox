const mongoose = require("mongoose");

const incomeSchema = new mongoose.Schema(
  {
    title: String,
    receivalDate: Date,
    categoryId: {
      type: mongoose.ObjectId,
      required: "Income source is required",
    },
    amount: {
      type: Number,
      required: "Income amount is required",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = incomeSchema;
