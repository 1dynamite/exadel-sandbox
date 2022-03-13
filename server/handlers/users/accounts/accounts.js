const accounts = require("../../../database/db.accounts");

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

const accountByID = (req, res, next, accountId) => {
  req.account = accounts.getAccountByID(accountId);

  next();
};

module.exports = {
  create,
  read,
  update,
  remove,
  accountByID,
};
