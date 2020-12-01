const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

if (process.env.ENV === "Test") {
  console.log("This is a test");
  mongoose.connect("mongodb://localhost/bookAPI_Test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
} else {
  console.log("This is for real");
  mongoose.connect("mongodb://localhost/bookAPI-prod", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
}
mongoose.Promise = global.Promise;

mongoose.connection.on("connected", function () {
  console.log("=====Conexão estabelecida com sucesso=====");
});

// eslint-disable-next-line no-undef
const port = process.env.PORT || 3000;
const Book = require("./models/bookModel");
const bookRouter = require("./routes/bookRouter")(Book);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api", bookRouter);

app.get("/", (req, res) => {
  res.send("Welcome to my Nodemon API!");
});

app.server = app.listen(port, () => {
  console.log(`Running on port ${port}`);
});

module.exports = app;
