const express = require("express");
const handler = require("../../../handlers/users/categories/categories");

const router = express.Router();

router.get("/", handler.readMany);
router.post("/", handler.create);
router.put("/", handler.readManySpecified);

router
  .route("/:categoryId")
  .get(handler.read)
  .put(handler.update)
  .delete(handler.remove);

router.param("categoryId", handler.categoryById);

module.exports = router;
