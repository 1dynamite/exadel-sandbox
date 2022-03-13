const incomesCategories = [];

function getIncomesCategoryById(id) {
  return incomesCategories.find((category) => category.id === id);
}

module.exports = {
  getIncomesCategoryById,
};
