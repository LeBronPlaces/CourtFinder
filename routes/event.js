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
    const userId = req.session.user._id
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
                User.findById(userId)
                    .then( organizingUser => {
                        organizingUser.organizedEvents.push(createdEvent._id)
                        organizingUser.save()
                        res.redirect('/event/my-events')
                    })
            })
            .catch(err => { next(err) })
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
        .populate('organizedEvents')
        .populate('playedEvents')
        .populate('invitations')  
        .then(curUser => {
            Event.find({_id: {$in: curUser.organizedEvents}})
                .populate('organizer')
                .populate('players')
                .populate('invitedPlayers')
                .populate('court')
                .then(organizedEvents => {
                    organizedEvents.map(event => {
                        return event.dateString = event.date.toLocaleDateString('de-DE'), event.timeString = event.date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
                    })
                    // console.log(dateString = organizedEvents[0].dateString);
                    // console.log(dateString = organizedEvents[0].timeString);
                    Event.find({_id: {$in: curUser.playedEvents}})
                        .populate('organizer')
                        .populate('players')
                        .populate('invitedPlayers')
                        .populate('court')
                        .then(playedEvents => {
                            playedEvents.map(event => {
                                return event.dateString = event.date.toLocaleDateString('de-DE'), event.timeString = event.date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
                            })
                            Event.find({_id: {$in: curUser.invitations}})
                                .populate('organizer')
                                .populate('players')
                                .populate('invitedPlayers')
                                .populate('court')
                                .then( invitations => {
                                    invitations.map(event => {
                                        return event.dateString = event.date.toLocaleDateString('de-DE'), event.timeString = event.date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
                                    })
                                    res.render('event/my-events', {
                                        organizedEvents: organizedEvents,
                                        playedEvents: playedEvents,
                                        invitations: invitations
                                    })
                                })
                                .catch(err => { next(err) })
                        })
                        .catch(err => { next(err) })
                })
                .catch(err => { next(err) })
        })
        .catch(err => { next(err) })

});

router.post('/event/join', (req, res, next) => {
    const id = req.body.EventId
    const userId = req.session.user._id
    console.log({id});
    console.log({userId});
    Event.findById(id)
        .then(eventFromDb => {
            eventFromDb.players.push(userId)
            eventFromDb.save()
            User.findById(userId)
                .then( userFromDb => {
                    userFromDb.playedEvents.push(id)
                    const pos = userFromDb.invitations.indexOf(id)
                    if (pos !== -1) userFromDb.invitations.splice(pos, 1)
                    userFromDb.save()
                    res.redirect('/event/all')
                })
                .catch(err => { next(err) })
        })
        .catch(err => { next(err) })
});

router.post('/accept-invte', (req, res, next) => {
    const eventId = req.body.eventId
    const userId = req.session.user._id
    User.findById(userId)
        .then( curUser => {
            curUser.invitations.splice(curUser.invitations.indexOf(eventId),1)
            curUser.playedEvents.push(eventId)
            curUser.save()
            Event.findById(eventId)
                .then( curEvent => {
                curEvent.invitedPlayers.splice(curEvent.invitedPlayers.indexOf(userId),1)
                curEvent.players.push(userId)
                curEvent.save()
                res.redirect('event/my-events')
                })
                .catch(err => { next(err) })
        })
        .catch(err => { next(err) })
});

router.post('/reject-invte', (req, res, next) => {
    const eventId = req.body.eventId
    const userId = req.session.user._id
    User.findById(userId)
        .then( curUser => {
            curUser.invitations.splice(curUser.invitations.indexOf(eventId),1)
            curUser.save()
            Event.findById(eventId)
                .then( curEvent => {
                curEvent.invitedPlayers.splice(curEvent.invitedPlayers.indexOf(userId),1)
                curEvent.save()
                res.redirect('event/my-events')
                })
                .catch(err => { next(err) })
        })
        .catch(err => { next(err) })
});

module.exports = router;