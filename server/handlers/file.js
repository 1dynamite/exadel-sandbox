const upload = (req, res, next) => {
  res.json({
    url: req.originalUrl,
    body: req.body,
  });
};

const read = (req, res, next) => {
  res.json({
    url: req.originalUrl,
    body: req.body,
  });
};

const remove = (req, res, next) => {
  res.json({
    url: req.originalUrl,
    body: req.body,
  });
};

module.exports = {
  upload,
  read,
  remove,
};
