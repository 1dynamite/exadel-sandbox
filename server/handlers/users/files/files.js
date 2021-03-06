const files = require("../../../database/db.files");

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

const fileById = (req, res, next, fileId) => {
  req.file = files.getFileById(fileId);

  next();
};

module.exports = {
  create,
  read,
  update,
  remove,
  fileById,
};
