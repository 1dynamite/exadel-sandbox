const create = (req, res) => {
  res.json({
    url: req.originalUrl,
    body: req.body,
  });
};

const read = (req, res) => {
  res.json({
    url: req.originalUrl,
    body: req.body,
  });
};

const update = (req, res) => {
  res.json({
    url: req.originalUrl,
    body: req.body,
  });
};

const remove = (req, res) => {
  res.json({
    url: req.originalUrl,
    body: req.body,
  });
};

module.exports = {
  create,
  read,
  update,
  remove,
};
