const incomes = [];

function getIncomeById(id) {
  return incomes.find((income) => income.id === id);
}

module.exports = {
  getIncomeById,
};
