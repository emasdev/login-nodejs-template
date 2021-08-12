var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "IDM" });
});

/* login */
router.get("/login", function(req, res, next) {
  res.render("login", { title: "login" });
});

/* signup */
router.get("/signup", function(req, res, next) {
  res.render("signup", { title: "signup" });
});

/* profile */
router.get("/profile", function(req, res, next) {
  res.render("profile", { title: "profile" });
});

module.exports = router;
