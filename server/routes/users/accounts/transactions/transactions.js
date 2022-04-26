const express = require("express");
const handler = require("../../../../handlers/users/accounts/transactions/transactions");

const router = express.Router();

router.get("/", handler.readAll);
router.post("/", handler.create);

router
  .route("/:transactionId")
  .get(handler.read)
  .put(handler.update)
  .delete(handler.remove);

router.param("transactionId", handler.transactionById);

module.exports = router;
