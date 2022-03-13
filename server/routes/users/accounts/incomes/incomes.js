const express = require("express");
const handler = require("../../../../handlers/users/accounts/incomes/incomes");

const router = express.Router();

router.post("/", handler.create);

router
  .route("/:incomeId")
  .get(handler.read)
  .put(handler.update)
  .delete(handler.remove);

router.param("incomeId", handler.incomeById);

module.exports = router;
