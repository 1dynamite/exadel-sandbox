const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: "Category name is required",
  },
});

module.exports = categorySchema;
