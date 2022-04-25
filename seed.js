const Court = require('./models/Court')
const Event = require('./models/Event')
const User = require('./models/User')

const mongoose = require('mongoose')
// mongoose.connect('mongodb://localhost/library')
mongoose.connect('mongodb+srv://admin:root@cluster0.grghy.mongodb.net/courtFinder')


const courts = [
    {
        name: 'Am Nordbahnhof',
        location: {
            lat: 52.533880,
            long:13.383220
        },
        details: {
            accessibility: {
                fulltime: true,
                opening: 0,
                closing: 24
            },
            surface: 'concrete',
            rope: 'rope'
        },
        description: 'Nice spot in the heart of Berlin',
        numBaskets: 4
    },
    {
        name: 'Singer Court',
        location: {
            lat: 52.533880,
            long:13.383220
        },
        details: {
            accessibility: {
                fulltime: false,
                opening: 16,
                closing: 22
            },
            surface: 'rubber',
            rope: 'chain'
        },
        description: 'Great court! Most of the time you find other palyers happy for you to join. Beginners welcome.',
        lighting: true,
        numBaskets: 4
    }
]

const users = [
	{
		username: "Arne",
		password: 'Security!',
        role: 'admin'
	},
    {
        username: 'Steve Kerr',
        password: 'test123',
        role: 'user'
    }
]

Court.insertMany(courts)
	.then(courts => {
		console.log(`Success - added ${courts.length} to the db`)
	})
	.catch(err => {
		console.log(err)
	})

User.insertMany(users)
	.then(users => {
		console.log(`Success - added ${users.length} to the db`)
	})
	.catch(err => {
		console.log(err)
	})