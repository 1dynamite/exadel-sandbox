const login = (req, res, next) => {
  res.json({
    url: req.originalUrl,
    body: req.body
  });
};

const logout = (req, res, next) => {
  res.json({
    url: req.originalUrl,
    body: req.body
  });
};

const register = (req, res, next) => {
  res.json({
    url: req.originalUrl,
    body: req.body
  });
};


module.exports = {
  login,
  logout,
  register
};