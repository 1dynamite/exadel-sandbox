const balance = (req, res) => {
  res.json({
    url: req.originalUrl,
    body: req.body
  });
};



module.exports = {
  balance
};