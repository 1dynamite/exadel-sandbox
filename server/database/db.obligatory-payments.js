const obligatoryPayments = [];

function getObligatoryPaymentById(id) {
  return obligatoryPayments.find((payment) => payment.id === id);
}

module.exports = {
  getObligatoryPaymentById,
};
