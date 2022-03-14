const expensesCategories = require("../../../database/db.expensesCategories");

const create = (req, res) => {
  res.json({
    url: req.originalUrl,
    body: req.body,
  });
};

const read = (req, res) => {
  res.json({
    url: req.originalUrl,
    body: req.body,
  });
};

const update = (req, res) => {
  res.json({
    url: req.originalUrl,
    body: req.body,
  });
};

const remove = (req, res) => {
  res.json({
    url: req.originalUrl,
    body: req.body,
  });
};

const expensesCategoryById = (req, res, next, categoryId) => {
  req.expensesCategory = expensesCategories.getExpensesCategoryById(categoryId);

  next();
};

module.exports = {
  create,
  read,
  update,
  remove,
  expensesCategoryById,
};
