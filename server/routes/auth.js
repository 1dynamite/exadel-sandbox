const express = require("express");
const handler = require("../handlers/auth");

const router = express.Router();

router.get("/login", handler.login);

router.get("/logout", handler.logout);

router.post("/register", handler.register);

module.exports = router;
