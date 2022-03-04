const create = (req, res, next) => {
  res.json({
    url: req.originalUrl,
    body: req.body
  });
};

const read = (req, res, next) => {
  res.json({
    url: req.originalUrl,
    body: req.body
  });
};

const edit = (req, res, next) => {
  res.json({
    url: req.originalUrl,
    body: req.body
  });
};

const remove = (req, res, next) => {
  res.json({
    url: req.originalUrl,
    body: req.body
  });
};


module.exports = {
  create,
  read,
  edit,
  remove
};