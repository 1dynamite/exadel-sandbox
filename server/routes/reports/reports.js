const express = require("express");
const handler = require("../../handlers/reports/reports");
const isSignedIn = require("../../authorization/is-signed-in");
const isAdmin = require("../../authorization/is-admin");

const router = express.Router();

router.use(isSignedIn(), isAdmin);

router.get("/users/total-expenses", handler.expensesTotal);

router.get("/users/average-savings", handler.savingsAverage);

router.get("/users/users-count", handler.usersCount);

module.exports = router;
