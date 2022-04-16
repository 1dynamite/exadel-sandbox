const express = require("express");
const handler = require("../../../handlers/users/categories/categories");

const router = express.Router();

router.post("/", handler.create);

router
  .route("/:categoryId")
  .get(handler.read)
  .put(handler.update)
  .delete(handler.remove);

router.param("categoryId", handler.categoryById);

module.exports = router;
