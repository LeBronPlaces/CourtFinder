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
            User.find()
                .then(allUsers => {
                    res.render('event/create', {allCourts: allCourts, allUsers: allUsers})
                })
                .catch(err => { next(err) })
        })
        .catch(err => { next(err) })
});

router.post('/event/create', isUser(), (req, res, next) => {
    const {name, description, date, court, invited} = req.body
    Event.create({
        name,
        description,
        date,
        court,
        organizer: req.session.user._id,
        players: [req.session.user._id],
        invitedPlayers: invited
    })
    .then( createdEvent => {
        User.find({_id: {$in: createdEvent.invitedPlayers}})
            .then( invitedPlayers => {
                invitedPlayers.forEach(invitedPlayer => {
                    invitedPlayer.invitations.push(createdEvent._id)
                    invitedPlayer.save()
                })
            })
            .catch(err => { next(err) })
        res.redirect('/event/all')
    })
    .catch(err => { next(err) })
});

router.get('/event/all', (req, res, next) => {
    const id = req.session.user._id
    Event.find()
        .populate('organizer')
        .populate('players')
        .populate('court')
        .then(allEvents => {
            allEvents.map(event => {
                const playerIds = []
                event.players.forEach( player => {
                    playerIds.push(String(player._id))
                })
                if (playerIds.includes(id)) {
                    return event.button = ``
                } else {
                    return event.button = `<input type="hidden" value="${event._id}" name="EventId"><button type="submit"> Join Event</button>`
                }
            })
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
                    // console.log(usersEvents)
                    console.log(usersEvents)
                    res.render('event/my-events', {events: usersEvents})
                } )
                .catch(err => { next(err) })
        })
        .catch(err => { next(err) })

});

router.get('/event/attended-events', (req, res, next) => {
    const id = req.session.user._id
    User.findById(id)
        .then(curUser => {
            Event.find({players: curUser._id})
            .populate('organizer')
            .populate('players')
            .populate('court')
                .then( usersEvents => {
                    // console.log(usersEvents)
                    console.log(usersEvents)
                    res.render('event/attended-events', {events: usersEvents})
                } )
                .catch(err => { next(err) })
        })
        .catch(err => { next(err) })

});

router.post('/event/join', (req, res, next) => {
    const id = req.body.EventId
    const userId = req.session.user._id
    Event.findById(id)
        .then(eventFromDb => {
            eventFromDb.players.push(userId)
            eventFromDb.save()
            User.findById(userId)
                .then( userFromDb => {
                    userFromDb.playedEvents.push(id)
                    userFromDb.save()
                    res.redirect('/event/all')
                })
                .catch(err => { next(err) })
        })
        .catch(err => { next(err) })
});

module.exports = router;