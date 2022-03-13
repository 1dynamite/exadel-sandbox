const bcrypt = require("bcrypt");

const users = [
  {
    id: "adminID",
    email: process.env.ADMIN_EMAIL,
    password: bcrypt.hashSync(process.env.ADMIN_PASSWORD, 10),
    role: "admin",
  },
];

function registerUser(user) {
  users.push({
    id: Math.random().toString(),
    email: user.email,
    password: bcrypt.hashSync(user.password, 10),
    role: user.role,
  });

  return users[users.length - 1];
}

function getUserByEmail(email) {
  return users.find((user) => user.email === email);
}

function getUserByID(id) {
  return users.find((user) => user.id === id);
}

function getAll() {
  return users.map((user) => ({
    id: user.id,
    email: user.email,
    role: user.role,
  }));
}

function signinUser(email, password) {
  const user = getUserByEmail(email);
  if (user && bcrypt.compareSync(password, user.password)) {
    return user;
  }

  if (user) throw new Error("Wrong password");

  return null;
}

module.exports = {
  signinUser,
  getUserByEmail,
  registerUser,
  getUserByID,
  getAll,
};
