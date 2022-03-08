const express = require("express");
const router = express.Router();
const handler = require("../handlers/file");

router.post("/", handler.upload);

router.route("/:id").get(handler.read).delete(handler.remove);

module.exports = router;
