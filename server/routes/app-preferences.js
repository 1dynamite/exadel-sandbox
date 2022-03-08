const express = require("express");
const handler = require("../handlers/app-preferences");

const router = express.Router();

router.put("/language-set", handler.setLanguage);

router.put("/country-set", handler.setCountry);

module.exports = router;
