const users = require("../../database/db.users");

const role = "user";

const create = (req, res) => {
  const user = {
    role,
    email: req.body.email,
    password: req.body.password,
  };

  res.json(users.registerUser(user));
};

const read = (req, res) => {
  res.json(req.requestedUser);
};

const update = (req, res) => {
  res.json("update method is not yet defined");
};

const remove = (req, res) => {
  res.json("remove method is not yet defined");
};

const userByID = (req, res, next, userId) => {
  req.requestedUser = users.getUserByID(userId);

  next();
};

module.exports = {
  create,
  read,
  update,
  remove,
  userByID,
};
