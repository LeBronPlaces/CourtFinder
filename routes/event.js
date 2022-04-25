const router = require("express").Router();
const bcrypt = require('bcryptjs');

const Court = require('../models/Court')
const Event = require('../models/Event')
const User = require('../models/User')

router.get('/event/create', (req, res, next) => {
    res.render('event/create')
});

// router.post('/event/create', (req, res, next) => {
//     //
// });

module.exports = router;