const piggybanks = [];

function getPiggybankById(id) {
  return piggybanks.find((bank) => bank.id === id);
}

module.exports = {
  getPiggybankById,
};
