const jwt = require("jsonwebtoken");
const User = require("../../models/user/user");
const expiresIn = require("../../helpers/expires-in");

const login = async (req, res) => {
  if (!req.body.email || !req.body.password)
    return res
      .status(400)
      .end("Request body should hold email and password fields");

  try {
    const user = await User.authenticate(req.body.email, req.body.password);

    const payload = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    return res.json({
      token: `Bearer ${token}`,
      expiresIn: expiresIn(process.env.JWT_EXPIRES_IN),
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        accounts: user.accounts,
        incomeCategories: user.incomeCategories,
        expenseCategories: user.expenseCategories,
      },
    });
  } catch (err) {
    return res.status(400).end(err.message);
  }
};

module.exports = {
  login,
};
