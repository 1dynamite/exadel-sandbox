const Currencies = require("../../models/currencies/currencies");

const getAllCurrencies = async (req, res) => {
  try {
    const currencies = await Currencies.find();

    res.json({
      currencies,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error,
    });
  }
};

module.exports = {
  getAllCurrencies,
};
