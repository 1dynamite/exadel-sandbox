const express = require("express");
const handler = require("../../../../handlers/users/accounts/expenses/expenses");

const router = express.Router();

router.post("/", handler.create);

router
  .route("/:expenseId")
  .get(handler.read)
  .put(handler.update)
  .delete(handler.remove);

router.param("expenseId", handler.expenseById);

module.exports = router;
