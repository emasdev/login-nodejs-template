var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "IDM" });
});

/* development */
router.get("/login", function(req, res, next) {
  res.render("login", { title: "login" });
});

/* developer */
router.get("/signup", function(req, res, next) {
  res.render("signup", { title: "signup" });
});

module.exports = router;
