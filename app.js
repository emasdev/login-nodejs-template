const createError = require("http-errors");
const path = require("path");
const express = require("express");
const logger = require("morgan");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const admin = require("firebase-admin");
const app = express(); 

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: 'https://idm-db-default-rtdb.firebaseio.com/'
});

const db = admin.database();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");


// Bootstrap 4 y librerías necesarias
app.use("/css", express.static(__dirname + "/node_modules/bootstrap/dist/css"));
app.use("/js", express.static(__dirname + "/node_modules/jquery/dist"));
app.use("/js", express.static(__dirname + "/node_modules/popper.js/dist/umd"));
app.use("/js", express.static(__dirname + "/node_modules/bootstrap/dist/js"));


// Add local files
app.use("/js", express.static(__dirname + "/public/javascripts"));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));


app.use("/", indexRouter);
app.use("/users", usersRouter);

app.post("/usuarios/nuevo", (req, res) => {
  db.ref('usuarios').push(req.body);
  res.send("received");
});

app.post("/sessionLogin", (req, res) => {
  const idToken = req.body.idToken.toString();

  const expiresIn = 60 * 60 * 24 * 5 * 1000;

  admin
    .auth()
    .createSessionCookie(idToken, { expiresIn })
    .then(
      (sessionCookie) => {
        const options = { maxAge: expiresIn, httpOnly: true };
        res.cookie("session", sessionCookie, options);
        res.end(JSON.stringify({ status: "success" }));
      },
      (error) => {
        res.status(401).send("UNAUTHORIZED REQUEST!");
      }
    );
});

app.get("/sessionLogout", (req, res) => {
  res.clearCookie("session");
  res.redirect("/login");
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
