// server.js

"use strict";

require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const hbs = require("express-handlebars");
const path = require("path");
const session = require("express-session");
const bodyParser = require("body-parser");
const passport = require("passport");
var MongoStore = require("connect-mongo")(session);

var port = process.env.PORT || 3000;

// Database Connection
mongoose.connect(
  process.env.MONGO_DB,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) console.log("could not connect to db " + err);
  }
);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("connected to the db ;)");
});

const session_settings = {
  secret: process.env.SESSION_KEY,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 10 * 24 * 60 * 60 * 1000,
  },
};

session_settings.store = new MongoStore({
  mongooseConnection: mongoose.connection,
});

app.use(session(session_settings));
app.use(function (req, res, next) {
  res.locals.session = req.session;
  next();
});

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine("hbs", hbs({ defaultLayout: "layout", extname: ".hbs" }));
app.set("view engine", "hbs");

app.use("/static", express.static(path.join(__dirname, "public")));

const main = require("./server/routes/main/main");
const api = require("./server/routes/api/main");

app.use("/", main);
app.use("/", api);

// app.use("*", (req, res) => {
//   res.render("error/error", { layout: "home/main" });
// });

app.listen(port);
console.log("listening on port " + port);
