const router = require("express").Router();
const bcrypt = require('bcryptjs');

const Court = require('../models/Court')
const Event = require('../models/Event')
const User = require('../models/User')

router.get('/event/create', (req, res, next) => {
    Court.find()
        .then(allCourts => {
            let selectTags = ''
            res.render('event/create', {allCourts: allCourts})
        })
        .catch(err => { next(err) })
});

router.post('/event/create', (req, res, next) => {
    const {name, description, date, court} = req.body
    Event.create({
        name,
        description,
        date,
        court,
        organizer: req.session.user._id
    })
    .then( createdEvent => {
        console.log('createdEvent :', createdEvent)
        res.redirect('/main')
    })
    .catch(err => { next(err) })
});

module.exports = router;