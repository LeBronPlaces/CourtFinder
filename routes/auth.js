const router = require("express").Router();
const bcrypt = require('bcryptjs');
const { uploader, cloudinary } = require('../config/cloudinary');
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const User = require('../models/User')

router.get('/signup', (req, res, next) => {
	res.render('auth/signup')
});

router.post('/signup', uploader.single('profile-picture'), (req, res, next) => {
    // get user info from req
    const { username, password } = req.body
    const role = 'user'
    console.log('REQUEST FILE: ', req.file)
    // const imgName = req.file.originalname
    const imgPath = req.file.path
    // const publicId = req.file.filename
    if (username.length === 0 || password.length === 0) {
        res.render('auth/signup', {message: 'Username and Password cannot be empty'})
        return
    }
    // find username -> error if exists, add to db otherwise
    User.findOne({username: username})
        .then( userFromDb => {
            if( userFromDb !== null ) {
                res.render('auth/signup', {message: 'Username is already taken. Please try another name.'})
                return
            } else {
                // create hashed password
                const salt = bcrypt.genSaltSync()
                const hash = bcrypt.hashSync(password, salt)
                // create the user
                User.create({
                    username: username,
                    password: hash,
                    role: role,
                    image: imgPath
                })
                    .then(
                        createdUser => {
                            req.session.user = createdUser
                            res.redirect('/main')
                        }  
                    )
                    .catch(err => { next(err) })
            }
        })
        .catch(err => { next(err) })
});

router.get('/login', (req, res, next) => {
    res.render('auth/login')
});

router.post('/login', (req, res, next) => {
    // get data from post request
    const { username, password } = req.body
    // try to find the user
    User.findOne({username: username})
        .then( userFromDb => {
            // check if user exists
            if (userFromDb === null) {
                res.render('auth/login', { message: 'Invalid User Credentials. Please try again.'})
                return
            }
            // check password
            if (bcrypt.compareSync(password, userFromDb.password)) {
                req.session.user = userFromDb
                res.redirect('/main')
            } else {
                res.render('auth/login', { message: 'Invalid User Credentials. Please try again.'})
            }
        } )
        .catch(err => { next(err) })
});

router.get('/logout', (req, res, next) => {
	req.session.destroy((err => {
		if (err) {
			next(err)
		} else {
			// success - we don't have an error
			res.redirect('/main')
		}
	}))
});

module.exports = router;