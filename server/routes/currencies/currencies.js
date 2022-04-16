const express = require("express");
const handler = require("../../handlers/currencies/currencies");

const router = express.Router();

router.get("/", handler.getAllCurrencies);

module.exports = router;
