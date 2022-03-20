const getErrorMessage = require("../../../helpers/getErrorMessage");

const create = (req, res) => {
  const categoryData = {
    name: req.body.categoryName,
  };

  req.profile.incomeCategories.push(categoryData);

  try {
    req.profile.save();

    return res.json({
      message: "New income category is successfully saved!",
    });
  } catch (err) {
    const message = getErrorMessage(err);

    return res.status(400).json({ message });
  }
};

const read = (req, res) => {
  res.json(req.incomeCategory);
};

const update = async (req, res) => {
  req.incomeCategory.name = req.body.categoryName;

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
  const newCtgrs = req.profile.incomeCategories.filter(
    (elem) => elem._id.toString() !== req.incomeCategory._id.toString()
  );

  req.profile.incomeCategories = newCtgrs;

  try {
    await req.profile.save();

    res.json({
      message: "Successfully removed!",
    });
  } catch (err) {
    res.status(400).json(err);
  }
};

const incomesCategoryById = (req, res, next, categoryId) => {
  const ctgry = req.profile.incomeCategories.find(
    (elem) => elem._id.toString() === categoryId
  );

  if (ctgry) req.incomeCategory = ctgry;
  else {
    return res.status(400).json({
      message: "Income category not found",
    });
  }

  return next();
};

module.exports = {
  create,
  read,
  update,
  remove,
  incomesCategoryById,
};
