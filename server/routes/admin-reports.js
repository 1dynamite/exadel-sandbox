const express = require("express");
const router = express.Router();
const handler = require("../handlers/admin-reports");

router.get("/expenses-total", handler.expensesTotal);

router.get("/balance-average", handler.balanceAverage);

router.get("/users-count", handler.usersCount);

module.exports = router;
