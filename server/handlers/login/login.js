const jwt = require("jsonwebtoken");
const users = require("../../database/db.users");

const login = (req, res) => {
  try {
    if (!req.body.email || !req.body.password)
      return res
        .status(400)
        .end("Request body should hold email and password fields");

    const user = users.signinUser(req.body.email, req.body.password);

    if (!user) return res.status(404).end("User not found");

    const payload = {
      id: user.id,
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
