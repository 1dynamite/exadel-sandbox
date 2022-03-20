const expensesTotal = (req, res) => {
  res.json(req.account.totalExpense);
};

const expensesTotalByCategory = (req, res) => {
  res.json(req.account.totalExpenseByCategory);
};

const incomesTotal = (req, res) => {
  res.json(req.account.totalIncome);
};

const incomesTotalBySource = (req, res) => {
  res.json(req.account.totalIncomeByCategory);
};

module.exports = {
  expensesTotal,
  expensesTotalByCategory,
  incomesTotal,
  incomesTotalBySource,
};
