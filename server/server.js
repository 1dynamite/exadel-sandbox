const express = require("express");
const path = require("path");
require("dotenv").config();

const accountRoute = require("./routes/account");
const authRoute = require("./routes/auth");
const expenseCategoryRoute = require("./routes/expense-category");
const expensesRoute = require("./routes/expenses");
const incomeRoute = require("./routes/income");
const statisticsRoute = require("./routes/statistics");
const fileRoute = require("./routes/file");
const miscellaneous = require("./routes/miscellaneous");
const adminReportsRoute = require("./routes/admin-reports");
const appPreferencesRoute = require("./routes/app-preferences");
const faqRoute = require("./routes/faq");
const limitExpensesRoute = require("./routes/limit-expenses");
const obligatoryPaymentRoute = require("./routes/obligatory-payment");
const piggybankRoute = require("./routes/piggybank");
const subscriptionRoute = require("./routes/subscription");
const userRoute = require("./routes/user");

const app = express();

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index", { test: "Homepage!" });
});

app.use(express.static(path.resolve(__dirname, "../public")));

app.use("/account", accountRoute);
app.use("/auth", authRoute);
app.use("/expense-category", expenseCategoryRoute);
app.use("/expenses", expensesRoute);
app.use("/income", incomeRoute);
app.use("/statistics", statisticsRoute);
app.use("/file", fileRoute);
app.use("/miscellaneous", miscellaneous);
app.use("/admin-reports", adminReportsRoute);
app.use("/app-preferences", appPreferencesRoute);
app.use("/faq", faqRoute);
app.use("/limit-expenses", limitExpensesRoute);
app.use("/obligatory-payment", obligatoryPaymentRoute);
app.use("/piggybank", piggybankRoute);
app.use("/subscription", subscriptionRoute);
app.use("/user", userRoute);

app.listen(process.env.PORT, () => {
  console.log(
    `Application is running on http://localhost:${process.env.PORT}/`
  );
});
