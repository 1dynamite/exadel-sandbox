const express = require("express");
const handler = require("../../../handlers/users/password-recovery/password-recovery");

const router = express.Router();

router.put("/", handler.recoverPassword);

module.exports = router;
