const mongoose = require("mongoose");

const predefCategoriesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: "Category title is required",
  },
  type: {
    type: String,
    required: [true, "Category type is required"],
    enum: {
      values: ["expense", "income"],
      message: "'{VALUE}' type is not supported",
    },
  },
  transactions: [mongoose.ObjectId],
});

module.exports = mongoose.model(
  "PredefCategories",
  predefCategoriesSchema,
  "predefined_categories"
);
