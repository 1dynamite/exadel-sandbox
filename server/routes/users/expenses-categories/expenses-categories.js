const express = require("express");
const handler = require("../../../handlers/users/expenses-categories/expenses-categories");

const router = express.Router();

router.post("/", handler.create);

router
  .route("/:expensesCategoryId")
  .get(handler.read)
  .put(handler.update)
  .delete(handler.remove);

router.param("expensesCategoryId", handler.expensesCategoryById);

module.exports = router;
