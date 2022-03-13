const express = require("express");
const handler = require("../../../handlers/users/files/files");

const router = express.Router();

router.post("/", handler.create);

router
  .route("/:fileId")
  .get(handler.read)
  .put(handler.update)
  .delete(handler.remove);

router.param("fileId", handler.fileById);

module.exports = router;
