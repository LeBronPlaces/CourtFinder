const router = require("express").Router();
const Court = require('../models/Court')

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


router.get('/courtLocations', (req, res, next) => {
    let locations = [];
    Court.find()
        .then(allCourts => {
            //console.log(allCourts);
            allCourts.forEach(function(court) {
                let lat = court.location.lat;
                let long = court.location.long;
                locations.push([long, lat]);       
            })
            res.json({ locations: locations })
        
        })
        .catch(err => { next(err) })
});

router.post('/courts', isUser(), (req, res, next) => {
    console.log(req.body);
    const {name, long, lat, fulltime, opening, closing, surface, basketType, description, numBaskets, lighting} = req.body
    let lightingChecked = lighting ? true : false
    let fulltimeChecked = fulltime ? true : false
    Court.create({
        name: name,
        location: {
            long: long,
            lat: lat
        },
        details: {
            accessibility: {
                fulltime: fulltimeChecked,
                opening: opening,
                closing: closing
            },
            surface: surface,
            basketType: basketType,
            lighting: lightingChecked,
            numBaskets: numBaskets
        },
        description: description
        
    })
    .then( createdCourt => {
       // console.log('createdCourt :', createdCourt)
    })
    .catch(err => { next(err) })
});


module.exports = router;
