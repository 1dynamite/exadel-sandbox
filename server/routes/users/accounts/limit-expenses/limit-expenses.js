const express = require("express");
const handler = require("../../../../handlers/users/accounts/limit-expenses/limit-expenses");

const router = express.Router();

router.put("/", handler.set);

module.exports = router;
