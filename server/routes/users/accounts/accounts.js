const express = require("express");
const handler = require("../../../handlers/users/accounts/accounts");
const expensesRouter = require("./expenses/expenses");
const incomesRouter = require("./incomes/incomes");
const limitExpensesRouter = require("./limit-expenses/limit-expenses");
const obligatoryPaymentsRouter = require("./obligatory-payments/obligatory-payments");
const piggybanksRouter = require("./piggybanks/piggybanks");
const reportsRouter = require("./reports/reports");

const router = express.Router();

router.post("/", handler.create);

router
  .route("/:accountId")
  .get(handler.read)
  .put(handler.update)
  .delete(handler.remove);

router.use("/:accountId/expenses", expensesRouter);
router.use("/:accountId/incomes", incomesRouter);
router.use("/:accountId/limit-expenses", limitExpensesRouter);
router.use("/:accountId/obligatory-payments", obligatoryPaymentsRouter);
router.use("/:accountId/piggybanks", piggybanksRouter);
router.use("/:accountId/reports", reportsRouter);

router.param("accountId", handler.accountByID);

module.exports = router;
