const router = require("express").Router();
const bcrypt = require('bcryptjs');

const Court = require('../models/Court')
const Event = require('../models/Event')
const User = require('../models/User')

const isUser = () => {
    return (req, res, next) => {
      // check for a logged in user
      if (req.session.user) {
        // if the user is logged in they can proceed as requested
        next()
      } else {
        res.render('auth/login', {message: 'Please log in in order to create an event.'})
      }
    }
  }

router.get('/event/create', (req, res, next) => {
    Court.find()
        .then(allCourts => {
            let selectTags = ''
            res.render('event/create', {allCourts: allCourts})
        })
        .catch(err => { next(err) })
});

router.post('/event/create', isUser(), (req, res, next) => {
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

router.get('/event/all', (req, res, next) => {
    Event.find()
        .populate('organizer')
        .populate('players')
        .populate('court')
        .then(allEvents => {
            console.log(allEvents);
            res.render('event/all', {events: allEvents})
        })
        .catch(err => { next(err) })
});

router.get('/event/my-events', (req, res, next) => {
    const id = req.session.user._id
    User.findById(id)
        .then(curUser => {
            Event.find({organizer: curUser._id})
            .populate('organizer')
            .populate('players')
            .populate('court')
                .then( usersEvents => {
                    console.log(usersEvents)
                    res.render('event/my-events', {events: usersEvents})
                } )
                .catch(err => { next(err) })
        })
        .catch(err => { next(err) })

});

module.exports = router;