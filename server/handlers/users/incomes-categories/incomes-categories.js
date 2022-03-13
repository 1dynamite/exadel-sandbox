const incomesCategories = require("../../../database/db.incomesCategories");

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

const incomesCategoryById = (req, res, next, categoryId) => {
  req.incomesCategory = incomesCategories.getIncomesCategoryById(categoryId);

  next();
};

module.exports = {
  create,
  read,
  update,
  remove,
  incomesCategoryById,
};
