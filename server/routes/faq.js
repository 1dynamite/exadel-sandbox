const express = require("express");
const router = express.Router();
const handler = require("../handlers/faq");

router.get("/", handler.read);

router.post("/", handler.create);

router.put("/", handler.edit);

router.delete("/", handler.remove);

module.exports = router;
