const piggybanks = require("../../../../database/db.piggybanks");

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

const piggybankById = (req, res, next, piggybankId) => {
  req.piggybank = piggybanks.getPiggybankById(piggybankId);

  next();
};

module.exports = {
  create,
  read,
  update,
  remove,
  piggybankById,
};
