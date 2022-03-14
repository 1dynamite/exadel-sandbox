const express = require("express");
const handler = require("../../../../handlers/users/accounts/piggybanks/piggybanks");

const router = express.Router();

router.post("/", handler.create);

router
  .route("/:piggybankId")
  .get(handler.read)
  .put(handler.update)
  .delete(handler.remove);

router.param("piggybankId", handler.piggybankById);

module.exports = router;
