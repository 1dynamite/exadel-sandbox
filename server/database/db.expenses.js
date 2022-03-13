const expenses = [];

function getExpenseById(id) {
  return expenses.find((expense) => expense.id === id);
}

module.exports = {
  getExpenseById,
};
