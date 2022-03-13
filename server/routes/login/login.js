const express = require("express");
const handler = require("../../handlers/login/login");

const router = express.Router();

router.post("/", handler.login);

module.exports = router;
