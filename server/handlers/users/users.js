const User = require("../../models/user/user");
const Transactions = require("../../models/transactions/transactions");
const PredefCategories = require("../../models/predef-categories/predef-categories");
const getErrorMessage = require("../../helpers/getErrorMessage");

const role = "user";

const create = async (req, res) => {
  let predefinedCategories;

  try {
    predefinedCategories = await PredefCategories.find();
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error,
    });
  }

  const userData = {
    role,
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    categories: predefinedCategories,
  };

  const user = new User(userData);

  try {
    await user.save();

    return res.json({
      message: "User successfully created!",
      user,
    });
  } catch (err) {
    const message = getErrorMessage(err);

    return res.status(400).end(message);
  }
};

const read = (req, res) => {
  res.json(req.profile);
};

const update = async (req, res) => {
  req.profile.name.firstName = req.body.name.firstName;
  req.profile.name.lastName = req.body.name.lastName;

  try {
    await req.profile.save();

    return res.json({
      message: "User is successfully updated!",
      user: req.profile,
    });
  } catch (err) {
    const message = getErrorMessage(err);

    return res.status(400).json({ message });
  }
};

const remove = async (req, res) => {
  try {
    await Transactions.deleteMany({ userId: req.profile._id });

    const deletedCount = await User.deleteOne({
      _id: req.profile._id,
    });

    res.json({ message: "User is successfully deleted!", ...deletedCount });
  } catch (err) {
    res.status(400).json({
      message: "Something went wrong",
    });
  }
};

const userByID = async (req, res, next, userId) => {
  try {
    const user = await User.findById(userId);

    if (!user) res.status(400).end("User not found");

    req.profile = user;
  } catch (err) {
    res.status(400).json(err);
  }

  next();
};

module.exports = {
  create,
  read,
  update,
  remove,
  userByID,
};
