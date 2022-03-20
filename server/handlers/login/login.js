const jwt = require("jsonwebtoken");
const User = require("../../models/user/user");

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

    return res.json(`Bearer ${token}`);
  } catch (err) {
    return res.status(400).end(err.message);
  }
};

module.exports = {
  login,
};
