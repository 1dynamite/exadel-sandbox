const getErrorMessage = require("../../../helpers/getErrorMessage");

const create = async (req, res) => {
  const categoryData = {
    title: req.body.categoryTitle,
    type: req.body.categoryType,
  };

  req.profile.categories.push(categoryData);

  try {
    await req.profile.save();

    return res.json({
      message: "New category is successfully saved!",
    });
  } catch (err) {
    const message = getErrorMessage(err);

    return res.status(400).json({ message });
  }
};

const read = (req, res) => {
  res.json(req.category);
};

const readMany = (req, res) => {
  if (req.query.type === undefined) {
    return res.json(req.profile.categories);
  }

  const many = req.profile.categories.filter((element) => {
    return req.query.type === element.type;
  });

  return res.json(many);
};

const readManySpecified = (req, res) => {
  const many = req.body.categories.map((element) =>
    req.profile.categories.find((it) => it._id.toString() === element)
  );

  return res.json(many);
};

const update = async (req, res) => {
  if (req.category.transactions.length !== 0)
    res.status(405).json({
      message: "Category is in use and cannot be updated",
    });

  req.category.title = req.body.categoryTitle;

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
  if (req.category.transactions.length !== 0)
    return res.status(405).json({
      message: "Category is in use and cannot be deleted",
    });

  const newCtgrs = req.profile.categories.filter(
    (elem) => elem._id.toString() !== req.category._id.toString()
  );

  req.profile.categories = newCtgrs;

  try {
    await req.profile.save();

    res.json({
      message: "Successfully removed!",
    });
  } catch (err) {
    res.status(400).json(err);
  }
};

const categoryById = (req, res, next, categoryId) => {
  const ctgry = req.profile.categories.find(
    (elem) => elem._id.toString() === categoryId
  );

  if (ctgry) req.category = ctgry;
  else {
    return res.status(400).json({
      message: "Category not found",
    });
  }

  return next();
};

module.exports = {
  create,
  read,
  readMany,
  readManySpecified,
  update,
  remove,
  categoryById,
};
