const set = (req, res) => {
  res.json({
    url: req.originalUrl,
    body: req.body,
  });
};

module.exports = {
  set,
};
