const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const accountSchema = require("./schemas/account");
const categorySchema = require("./schemas/category");

const userSchema = new mongoose.Schema({
  name: {
    firstName: {
      type: String,
      required: [true, "First name is required"],
    },
    lastName: String,
  },

  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email alread exists"],
    match: [
      // eslint-disable-next-line no-useless-escape
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },

  role: {
    type: String,
    enum: ["admin", "user"],
    required: [true, "User role is required"],
  },

  hashedPassword: {
    type: String,
    required: [true, "Password is required"],
  },

  accounts: [accountSchema],

  incomeCategories: [categorySchema],

  expenseCategories: [categorySchema],
});

const getFullName = function () {
  return this.name.firstName + this.name.lastName;
};

const setPassword = function (val) {
  this.hashedPassword = bcrypt.hashSync(val, 10);
};

userSchema.virtual("fullName").get(getFullName);

userSchema.virtual("password").set(setPassword);

userSchema.statics = {
  async authenticate(email, pwd) {
    const user = await this.findOne({ email }).exec();

    if (user && bcrypt.compareSync(pwd, user.hashedPassword)) return user;

    if (user) throw new Error("Wrong password");

    throw new Error("User does not exist; Try a different email");
  },
};

module.exports = mongoose.model("User", userSchema);
