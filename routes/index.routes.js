const router = require("express").Router();

const isAdmin = () => {
  return (req, res, next) => {
    if (req.session.user.role === 'admin') {
      next()
    } else if (req.session.user) {
      res.render('auth/login', {message: 'Admin privileges required, please log in with another account.'})
    }
    else {
      res.render('auth/login', {message: 'Please log in.'})
    }
  }
}

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/map", (req, res, next) => {
  res.render("map");
});

/* GET main page */
router.get("/main", (req, res, next) => {
  console.log('PRINTING USER: ', req.session.use)
  if (req.session.user) {
    res.render('main', {button: '<form action="/event/my-events" method="GET"><button type="submit">View My Events</button></form><form action="/logout" method="GET"><button type="submit">Logout</button></form>'})
  } else {
    res.render('main', {button: '<form action="/event/overview" method="GET"><button type="submit">View Event Overview</button></form><form action="/login" method="POST"><button type="submit">Login</button></form>'})
  }
  
});


module.exports = router;
