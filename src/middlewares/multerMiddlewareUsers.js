const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
	destination: function(req, file, cb){
		cb(null, path.join(__dirname, '../../public/images/users'));
	},
	filename: function(req, file, cb){
		cb(null, 'user_' + Date.now() + path.extname(file.originalname));
	},
})

const uploadFile = multer({ storage });

module.exports = uploadFile;