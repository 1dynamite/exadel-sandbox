const express = require("express");
const faqRouter = require("./faq/faq");
const loginRouter = require("./login/login");
const usersRouter = require("./users/users");
const reportsRouter = require("./reports/reports");
const currenciesRouter = require("./currencies/currencies");

const router = express.Router();

router.use("/currencies", currenciesRouter);
router.use("/faq", faqRouter);
router.use("/login", loginRouter);
router.use("/users", usersRouter);
router.use("/reports", reportsRouter);

module.exports = router;
