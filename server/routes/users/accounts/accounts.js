const express = require("express");
const handler = require("../../../handlers/users/accounts/accounts");
const transactionsRouter = require("./transactions/transactions");
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

router.use("/:accountId/transactions", transactionsRouter);
router.use("/:accountId/limit-expenses", limitExpensesRouter);
router.use("/:accountId/obligatory-payments", obligatoryPaymentsRouter);
router.use("/:accountId/piggybanks", piggybanksRouter);
router.use("/:accountId/reports", reportsRouter);

router.param("accountId", handler.accountByID);

module.exports = router;
