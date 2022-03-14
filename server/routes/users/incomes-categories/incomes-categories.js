const express = require("express");
const handler = require("../../../handlers/users/incomes-categories/incomes-categories");

const router = express.Router();

router.post("/", handler.create);

router
  .route("/:incomesCategoryId")
  .get(handler.read)
  .put(handler.update)
  .delete(handler.remove);

router.param("incomesCategoryId", handler.incomesCategoryById);

module.exports = router;
