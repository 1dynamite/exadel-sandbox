const expensesTotal = (req, res) => {
  res.json({
    url: req.originalUrl,
    body: req.body,
  });
};

const savingsAverage = (req, res) => {
  res.json({
    url: req.originalUrl,
    body: req.body,
  });
};

const usersCount = (req, res) => {
  res.json({
    url: req.originalUrl,
    body: req.body,
  });
};

module.exports = {
  expensesTotal,
  savingsAverage,
  usersCount,
};
