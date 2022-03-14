const incomes = require("../../../../database/db.incomes");

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

const incomeById = (req, res, next, incomeId) => {
  req.income = incomes.getIncomeById(incomeId);

  next();
};

module.exports = {
  create,
  read,
  update,
  remove,
  incomeById,
};
