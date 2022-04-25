const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

/* GET main page */
router.get("/main", (req, res, next) => {
  res.render("main");
});

module.exports = router;
