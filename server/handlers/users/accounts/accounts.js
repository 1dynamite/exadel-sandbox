const mongoose = require("mongoose");
const Transactions = require("../../../models/transactions/transactions");
const getErrorMessage = require("../../../helpers/getErrorMessage");
const User = require("../../../models/user/user");

const invalidTitle = (accountsMany, newAccountTitle) => {
  return accountsMany.find(
    (element) => element.title.toLowerCase() === newAccountTitle.toLowerCase()
  );
};

const hasTransactions = async (account) => {
  const accountTransactionsObj = await Transactions.findById(
    account.transactions
  );

  return accountTransactionsObj.transactions.length !== 0;
};

const create = async (req, res) => {
  const user = req.profile;

  if (invalidTitle(user.accounts, req.body.title))
    return res.status(400).json({
      field: "title",
      message:
        "Account with this title already exists; please change the title",
    });

  const newAccount = {
    _id: new mongoose.Types.ObjectId(),
    transactions: new mongoose.Types.ObjectId(),
    currency: {
      _id: req.body.currency._id,
      name: req.body.currency.name,
      symbol: req.body.currency.symbol,
    },
    title: req.body.title,
    description: req.body.description,
  };

  const newTransactionsById = {
    _id: newAccount.transactions,
    userId: user._id,
    transactions: [],
  };

  user.accounts.push(newAccount);

  const transactions = new Transactions(newTransactionsById);

  try {
    await user.save();
    await transactions.save();

    const account = user.accounts.find(
      (elem) => elem._id.toString() === newAccount._id.toString()
    );

    return res.json({
      message: "Account successfully created!",
      account,
    });
  } catch (err) {
    const message = getErrorMessage(err);

    return res.status(400).json({ message });
  }
};

const read = (req, res) => {
  res.json(req.account);
};

const update = async (req, res) => {
  if (
    req.body.title !== req.account.title &&
    invalidTitle(req.profile.accounts, req.body.title)
  )
    return res.status(400).json({
      field: "title",
      message:
        "Account with this title already exists; please change the title",
    });

  

  req.account.currency = req.body.currency;
  req.account.title = req.body.title;
  req.account.description = req.body.description;

  try {
    await req.profile.save();

    return res.json({
      message: "Account is successfully updated",
      account: req.account,
    });
  } catch (err) {
    const message = getErrorMessage(err);

    return res.status(400).json({ message });
  }
};

const remove = async (req, res) => {
  try {
    let account;

    req.profile.accounts = req.profile.accounts.filter((elem) => {
      const cond = elem._id.toString() !== req.account._id.toString();

      if (!cond) account = elem;

      return cond;
    });

    if (account === undefined)
      return res.status(400).json({
        message: "Accound could not be found",
      });

    await req.profile.save();
    await Transactions.deleteOne({ _id: req.account.transactions });

    res.json({ message: "Account was successfully removed", account });
  } catch (err) {
    res.status(400).json({
      message: "Something went wrong",
    });
  }
};

const accountByID = (req, res, next, accountId) => {
  const user = req.profile;

  const account = user.accounts.find(
    (elem) => elem._id.toString() === accountId
  );

  req.account = account;

  next();
};

module.exports = {
  create,
  read,
  update,
  remove,
  accountByID,
};
