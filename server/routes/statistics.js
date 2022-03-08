const express = require("express");
const router = express.Router();
const handler = require("../handlers/statistics");

router.get("/expenses-total", handler.expensesTotal);

router.get("/expenses-by-category", handler.expensesByCategory);

router.get("/income-total", handler.incomeTotal);

router.get("/income-by-source", handler.incomeBySource);

module.exports = router;
