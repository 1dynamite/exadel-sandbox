require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./app");

mongoose
  .connect(process.env.MONGODB_URI)
  .catch(() =>
    console.log(`unable to connect to database: ${process.env.MONGODB_URI}`)
  );

mongoose.connection.on("error", () => {
  console.log("database connection error");
});

app.listen(process.env.PORT, () => {
  console.log(
    `Application is running on http://localhost:${process.env.PORT}/`
  );
});
