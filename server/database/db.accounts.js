const accounts = [];

function getAccountByID(id) {
  return accounts.find((account) => account.id === id);
}

module.exports = {
  getAccountByID,
};
