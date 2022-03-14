const express = require("express");
const handler = require("../../../../handlers/users/accounts/obligatory-payments/obligatory-payments");

const router = express.Router();

router.post("/", handler.create);

router
  .route("/:obligatoryPaymentId")
  .get(handler.read)
  .put(handler.update)
  .delete(handler.remove);

router.param("obligatoryPaymentId", handler.obligatoryPaymentById);

module.exports = router;
