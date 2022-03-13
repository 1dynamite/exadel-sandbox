const isAuthorized = (req, res, next) => {
  const yes = req.user.id === req.requestedUser?.id;

  if (yes) next();
  else res.status(403).end("Unauthorized: you cannot access other users' data");
};

module.exports = isAuthorized;
