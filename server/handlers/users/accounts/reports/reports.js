const expensesCategories = require("../../../../database/db.expensesCategories");
const incomesCategories = require("../../../../database/db.incomesCategories");

const expensesTotal = (req, res) => {
  res.json({
    url: req.originalUrl,
    body: req.body,
  });
};

const expensesTotalByCategory = (req, res) => {
  res.json({
    url: req.originalUrl,
    body: req.body,
  });
};

const incomesTotal = (req, res) => {
  res.json({
    url: req.originalUrl,
    body: req.body,
  });
};

const incomesTotalBySource = (req, res) => {
  res.json({
    url: req.originalUrl,
    body: req.body,
  });
};

const expensesCategoryById = (req, res, next, categoryId) => {
  req.expensesCategory = expensesCategories.getExpensesCategoryById(categoryId);

  next();
};

const incomesSourceById = (req, res, next, categoryId) => {
  req.incomesCategory = incomesCategories.getIncomesCategoryById(categoryId);

  next();
};

module.exports = {
  expensesTotal,
  expensesTotalByCategory,
  incomesTotal,
  incomesTotalBySource,
  expensesCategoryById,
  incomesSourceById,
};
