const router = require("express").Router();
const bcrypt = require('bcryptjs');

const User = require('../models/User')

router.get('/signup', (req, res, next) => {
	res.render('auth/signup')
});

router.post('/signup', (req, res, next) => {
    // get user info from req
    const { username, password } = req.body
    const role = 'user'
    // optional: add some password or Username validation
    if (username.length === 0 || password.length === 0) {
        res.render('auth/signup', {message: 'Username and Password cannot be empty'})
        return
    }
    // find username -> error if exists, add to db otherwise
    User.findOne({username: username})
        .then( userFromDb => {
            if( userFromDb !== null ) {
                res.render('auth/signup', {message: 'Username is already taken. Please try another name.'})
            } else {
                // create hashed password
                const salt = bcrypt.genSaltSync()
                const hash = bcrypt.hashSync(password, salt)
                // create the user
                User.create({
                    username: username,
                    password: hash,
                    role: role
                })
                    .then(res.redirect('/main'))
            }
        })
        .catch(err => { next(err) })
});

module.exports = router;