const getErrorMessage = require("../../../helpers/getErrorMessage");

const create = (req, res) => {
  const categoryData = {
    name: req.body.categoryName,
  };

  req.profile.expenseCategories.push(categoryData);

  try {
    req.profile.save();

    return res.json({
      message: "New expense category is successfully saved!",
    });
  } catch (err) {
    const message = getErrorMessage(err);

    return res.status(400).json({ message });
  }
};

const read = (req, res) => {
  res.json(req.expenseCategory);
};

const update = async (req, res) => {
  req.expenseCategory.name = req.body.categoryName;

  try {
    await req.profile.save();

    res.json({
      message: "Successfully updated!",
    });
  } catch (err) {
    const message = getErrorMessage(err);

    res.status(400).json({
      message,
    });
  }
};

const remove = async (req, res) => {
  const newCtgrs = req.profile.expenseCategories.filter(
    (elem) => elem._id.toString() !== req.expenseCategory._id.toString()
  );

  req.profile.expenseCategories = newCtgrs;

  try {
    await req.profile.save();

    res.json({
      message: "Successfully removed!",
    });
  } catch (err) {
    res.status(400).json(err);
  }
};

const expensesCategoryById = (req, res, next, categoryId) => {
  const ctgry = req.profile.expenseCategories.find(
    (elem) => elem._id.toString() === categoryId
  );

  if (ctgry) req.expenseCategory = ctgry;
  else {
    return res.status(400).json({
      message: "Expense category not found",
    });
  }

  return next();
};

module.exports = {
  create,
  read,
  update,
  remove,
  expensesCategoryById,
};
