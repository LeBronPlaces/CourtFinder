const router = require("express").Router();
const Court = require('../models/Court')


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


module.exports = router;
