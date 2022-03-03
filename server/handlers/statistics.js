const expensesTotal = (req, res, next) => {
  res.json({
    url: req.originalUrl,
    body: req.body
  });
};

const expensesByCategory = (req, res, next) => {
  res.json({
    url: req.originalUrl,
    body: req.body
  });
};

const incomeTotal = (req, res, next) => {
  res.json({
    url: req.originalUrl,
    body: req.body
  });
};

const incomeBySource = (req, res, next) => {
  res.json({
    url: req.originalUrl,
    body: req.body
  });
};


module.exports = {
  expensesTotal,
  expensesByCategory,
  incomeTotal,
  incomeBySource
};