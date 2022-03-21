const mongoose = require("mongoose");

const getSubstring = (str) => {
  const arr = str.match(/{.+}/);

  if (arr !== null) return arr[0];

  return null;
};

const getErrorMessage = (err) => {
  let message;

  if (err instanceof mongoose.Error.ValidationError) {
    Object.values(err.errors).forEach((val) => {
      if (val.message) message = val.message;
    });

    return message;
  }

  switch (err.code) {
    case 11000:
    case 11001:
      message = `${getSubstring(err.message)} already exists`;
      break;
    default:
      message = "Something went wrong";
  }

  return message;
};

module.exports = getErrorMessage;
