const setLanguage = (req, res) => {
  res.json({
    url: req.originalUrl,
    body: req.body,
  });
};

const setCountry = (req, res) => {
  res.json({
    url: req.originalUrl,
    body: req.body,
  });
};

module.exports = {
  setLanguage,
  setCountry,
};
