const setLanguage = (req, res, next) => {
  res.json({
    url: req.originalUrl,
    body: req.body,
  });
};

const setCountry = (req, res, next) => {
  res.json({
    url: req.originalUrl,
    body: req.body,
  });
};

module.exports = {
  setLanguage,
  setCountry,
};
