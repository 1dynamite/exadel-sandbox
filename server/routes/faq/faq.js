const express = require("express");
const handler = require("../../handlers/faq/faq");
const isAdmin = require("../../authorization/is-admin");
const isSignedIn = require("../../authorization/is-signed-in");

const router = express.Router();

router
  .route("/")
  .get(handler.read)
  .all(isSignedIn(), isAdmin)
  .post(handler.create)
  .put(handler.edit)
  .delete(handler.remove);

module.exports = router;
