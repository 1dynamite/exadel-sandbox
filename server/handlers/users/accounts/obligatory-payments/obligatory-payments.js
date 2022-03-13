const obligatoryPayments = require("../../../../database/db.obligatory-payments");

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

const obligatoryPaymentById = (req, res, next, paymentId) => {
  req.obligatoryPayment =
    obligatoryPayments.getObligatoryPaymentById(paymentId);

  next();
};

module.exports = {
  create,
  read,
  update,
  remove,
  obligatoryPaymentById,
};
