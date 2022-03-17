const express = require("express");
const handler = require("../../handlers/users/users");
const isSignedIn = require("../../authorization/is-signed-in");
const isAuthorized = require("../../authorization/is-authorized");
const accountsRouter = require("./accounts/accounts");
const appPreferencesRouter = require("./app-preferences/app-preferences");
const incomeCategoriesRouter = require("./incomes-categories/incomes-categories");
const expenseCategoriesRouter = require("./expenses-categories/expenses-categories");
const filesRouter = require("./files/files");
const passwordRecoveryRouter = require("./password-recovery/password-recovery");

const router = express.Router();

router.route("/").post(handler.create);

router.use("/:userId", isSignedIn, isAuthorized);

router
  .route("/:userId")
  .get(handler.read)
  .put(handler.update)
  .delete(handler.remove);

router.use("/:userId/accounts", accountsRouter);
router.use("/:userId/app-preferences", appPreferencesRouter);
router.use("/:userId/incomes-categories", incomeCategoriesRouter);
router.use("/:userId/expenses-categories", expenseCategoriesRouter);
router.use("/:userId/files", filesRouter);
router.use("/:userId/password-recovery", passwordRecoveryRouter);

router.param("userId", handler.userByID);

module.exports = router;
