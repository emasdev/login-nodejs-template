var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Home" });
});

/* Crear nueva cuenta. */
router.get("/signup", function(req, res, next) {
  res.render("signup", { title: "Crear nueva cuenta." });
});

/* Acceder a cuenta */
router.get("/login", function(req, res, next) {
  res.render("login", { title: "Acceder a cuenta" });
});

module.exports = router;
