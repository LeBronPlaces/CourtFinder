const router = require("express").Router();
const Court = require('../models/Court')
const { uploader, cloudinary } = require('../config/cloudinary');
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const isUser = () => {
    return (req, res, next) => {
      // check for a logged in user
      if (req.session.user) {
        // if the user is logged in they can proceed as requested
        next()
      } else {
        res.render('auth/login', {message: 'Please log in in order to create a court.'})
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

router.get('/courtByLocation/:lat/:long', (req, res, next) => {
    let { lat, long } = req.params;
    lat = Number(lat);
    long = Number(long);
    
    Court.findOne({location: {lat : lat, long: long}})
        .then(courtByLocation => {
            res.json({ court: courtByLocation })    
            })
            
        .catch(err => { next(err) })
});

router.post('/courts', isUser(), uploader.single('court-picture'), (req, res, next) => {
    console.log(req.body);
    const {name, long, lat, fulltime, opening, closing, surface, basketType, description, image, numBaskets, lighting} = req.body
    let lightingChecked = lighting ? true : false
    let fulltimeChecked = fulltime ? true : false
    const imgPath = req.file.path
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
        description: description,
        image: imgPath
        
    })
    .then( createdCourt => {
       console.log('createdCourt :', createdCourt)
       res.redirect('/main')
    })
    .catch(err => { next(err) })
});

router.post('/court/delete/:id', (req, res, next) => {
    const id = req.params.id
    Court.findByIdAndDelete(id)
        .then(deletedCourt => {
            console.log(`deleted court with _id: ${deletedCourt._id}`)
            res.render('main')
        })
        .catch(err => { next(err) })
});


module.exports = router;
