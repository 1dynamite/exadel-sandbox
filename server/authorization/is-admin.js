const isAdmin = (req, res, next) => {
  const yes = req.user.role === "admin";

  if (yes) next();
  else res.status(403).end("Unauthorized: admin privileges are required");
};

module.exports = isAdmin;
