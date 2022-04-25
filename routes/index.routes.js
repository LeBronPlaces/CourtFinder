const router = require("express").Router();

const isUser = () => {
  return (req, res, next) => {
    // check for a logged in user
    if (req.session.user) {
      // if the user is logged in they can proceed as requested
      next()
    } else {
      console.log('LOGGED IN USER ROLE: ', req.session.user.role)
      res.redirect('auth/login')
    }
  }
}

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

/* GET main page */
router.get("/main", (req, res, next) => {
  // if (req.session.user) {
  //   res.render('main', {user: req.session.user.role})
  // } else {
  //   res.render('main')
  // }
  if (req.session.user) {
    res.render('main', {button: '<form action="/logout" method="GET"><button type="submit">Log Out</button></form>'})
  } else {
    res.render('main', {button: '<form action="/login" method="POST"><button type="submit">Log In</button></form>'})
  }
  
});


module.exports = router;
