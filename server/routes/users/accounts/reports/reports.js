const express = require("express");
const handler = require("../../../../handlers/users/accounts/reports/reports");

const router = express.Router();

router.get("/expenses-total", handler.expensesTotal);

router.get(
  "/expenses-categories/:expensesCategoryId/expenses-total",
  handler.expensesTotalByCategory
);

router.get("/incomes-total", handler.incomesTotal);

router.get(
  "/incomes-sources/:incomesSourceId/incomes-total",
  handler.incomesTotalBySource
);

router.param("expensesCategoryId", handler.expensesCategoryById);
router.param("incomesSourceId", handler.incomesSourceById);

module.exports = router;
