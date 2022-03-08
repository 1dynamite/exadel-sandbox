const expensesTotal = (req, res, next) => {
  res.json({
    url: req.originalUrl,
    body: req.body,
  });
};

const balanceAverage = (req, res, next) => {
  res.json({
    url: req.originalUrl,
    body: req.body,
  });
};

const usersCount = (req, res, next) => {
  res.json({
    url: req.originalUrl,
    body: req.body,
  });
};

module.exports = {
  expensesTotal,
  balanceAverage,
  usersCount,
};
