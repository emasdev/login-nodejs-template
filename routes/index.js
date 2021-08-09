var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Emas Dev" });
});

/* development */
router.get("/development", function(req, res, next) {
  res.render("development", { title: "development" });
});

/* developer */
router.get("/developer", function(req, res, next) {
  res.render("developer", { title: "developer" });
});

/* devenir */
router.get("/devenir", function(req, res, next) {
  res.render("devenir", { title: "devenir" });
});

module.exports = router;
