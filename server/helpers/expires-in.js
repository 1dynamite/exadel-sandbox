function expiresIn(sessionLength) {
  const n = parseInt(sessionLength, 10);

  return n * 1000 * 3600 * 24;
}

module.exports = expiresIn;
