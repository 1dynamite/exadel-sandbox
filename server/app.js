require("dotenv").config(); //needed when running the tests
const express = require("express");
const path = require("path");
const cors = require("cors");
const routes = require("./routes/routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "../public")));

app.use(routes);

module.exports = app;
