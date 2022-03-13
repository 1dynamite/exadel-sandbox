const expenses = require("../../../../database/db.expenses");

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

const expenseById = (req, res, next, expenseId) => {
  req.expense = expenses.getExpenseById(expenseId);

  next();
};

module.exports = {
  create,
  read,
  update,
  remove,
  expenseById,
};
