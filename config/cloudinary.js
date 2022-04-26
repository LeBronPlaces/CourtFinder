const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.API_KEY,
	api_secret: process.env.CLOUDINARY_SECRET
})

const storageProfileImg = new CloudinaryStorage({
	cloudinary: cloudinary,
	params: {
		folder: 'profile-pics',
		allowed_formats: 'jpg, png'
	}
})

const uploader = multer({ storageProfileImg })

module.exports = {
	uploader,
	cloudinary
}