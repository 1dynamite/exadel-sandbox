const expensesCategories = [];

function getExpensesCategoryById(id) {
  return expensesCategories.find((category) => category.id === id);
}

module.exports = {
  getExpensesCategoryById,
};
